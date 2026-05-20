"use client";

/**
 * Drag-and-drop PBQ components:
 *
 * DnDOrderingList         – sortable list  (ordering tasks)
 * DnDMatchingPool         – chip pool → row slots  (matching tasks)
 * DnDClassificationBoard  – item cards → category columns  (classification tasks)
 */

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle2, GripVertical, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ScenarioTask } from "@/data/pbq";

// ─── 1. DnD Ordering ────────────────────────────────────────────────────────

function SortableOrderItem({
  id,
  index,
  checked,
  isCorrect,
  isFail,
  correctLabel,
}: {
  id: string;
  index: number;
  checked: boolean;
  isCorrect: boolean;
  isFail: boolean;
  correctLabel: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: checked });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-3 rounded-card border border-border bg-card p-3 select-none",
        isDragging && "opacity-40 shadow-xl ring-2 ring-primary/40",
        isCorrect && "border-success/50 bg-success/5",
        isFail && "border-warning/50 bg-warning/5",
      )}
    >
      <span className="w-7 shrink-0 text-center text-lg font-black text-muted-foreground">
        {index + 1}
      </span>

      {!checked && (
        <button
          type="button"
          aria-label="Déplacer"
          title="Faire glisser pour réordonner"
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab touch-none p-1 text-muted-foreground hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" aria-hidden />
        </button>
      )}

      <span className="flex-1 text-sm leading-snug">{id}</span>

      {isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
      {isFail && (
        <div className="shrink-0 text-right">
          <XCircle className="h-4 w-4 text-warning" />
          <p className="text-xs text-muted-foreground">→ {correctLabel}</p>
        </div>
      )}
    </div>
  );
}

export function DnDOrderingList({
  task,
  order,
  onReorder,
  checked,
}: {
  task: ScenarioTask;
  order: string[];
  onReorder: (items: string[]) => void;
  checked: boolean;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as string);
      const newIndex = order.indexOf(over.id as string);
      onReorder(arrayMove(order, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="grid gap-2">
          {order.map((item, i) => (
            <SortableOrderItem
              key={item}
              id={item}
              index={i}
              checked={checked}
              isCorrect={checked && item === task.expectedAnswers[i]}
              isFail={checked && item !== task.expectedAnswers[i]}
              correctLabel={task.expectedAnswers[i] ?? ""}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// ─── 2. DnD Matching (chip pool → row slots) ─────────────────────────────────

/**
 * Two drag sources:
 *   "pool::{option}"        – chip from the options pool
 *   "placed::{taskId}::{i}" – token already sitting in a slot
 *
 * Two drop targets:
 *   "slot::{taskId}::{i}"  – a row slot
 *   "pool-area"             – the pool zone (clears a placed slot)
 */

function PoolChip({
  option,
  dimmed,
  disabled,
  asOverlay,
}: {
  option: string;
  dimmed?: boolean;
  disabled?: boolean;
  asOverlay?: boolean;
}) {
  const id = `pool::${option}`;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "rounded-card border border-border bg-card px-3 py-2 text-sm font-medium select-none transition-opacity",
        !disabled && "cursor-grab active:cursor-grabbing",
        disabled && "cursor-default",
        dimmed && !asOverlay && "opacity-40",
        isDragging && !asOverlay && "opacity-20",
        asOverlay && "shadow-xl ring-2 ring-primary/50 cursor-grabbing",
      )}
    >
      {option}
    </div>
  );
}

function PlacedToken({
  option,
  slotKey,
  taskId,
  itemIndex,
  disabled,
  fail,
  correct,
  ok,
}: {
  option: string;
  slotKey: string;
  taskId: string;
  itemIndex: number;
  disabled?: boolean;
  fail?: boolean;
  correct?: string;
  ok?: boolean;
}) {
  const id = `placed::${taskId}::${itemIndex}`;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center gap-2 rounded-card border border-border bg-muted px-3 py-2 text-sm select-none",
        !disabled && "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-20",
        ok && "border-success/50",
        fail && "border-warning/50",
      )}
    >
      {!disabled && (
        <GripVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      )}
      <span className="flex-1">{option}</span>
    </div>
  );
}

function RowSlot({
  taskId,
  itemIndex,
  placed,
  item,
  checked,
  ok,
  fail,
  correct,
}: {
  taskId: string;
  itemIndex: number;
  placed: string;
  item: string;
  checked: boolean;
  ok: boolean;
  fail: boolean;
  correct: string;
}) {
  const dropId = `slot::${taskId}::${itemIndex}`;
  const { setNodeRef, isOver } = useDroppable({ id: dropId });

  return (
    <tr
      className={cn(
        "border-b border-border/40 last:border-0",
        ok && "bg-success/5",
        fail && "bg-warning/5",
      )}
    >
      <td className="p-3 text-sm leading-snug">{item}</td>
      <td className="p-3">
        <div
          ref={setNodeRef}
          className={cn(
            "min-h-10 rounded-card border-2 border-dashed transition-colors",
            isOver && !checked && "border-primary bg-primary/5",
            !isOver && "border-border",
            placed && "border-solid",
          )}
        >
          {placed ? (
            <div className="p-1">
              <PlacedToken
                option={placed}
                slotKey={`${taskId}:${itemIndex}`}
                taskId={taskId}
                itemIndex={itemIndex}
                disabled={checked}
                ok={ok}
                fail={fail}
                correct={correct}
              />
              {fail && (
                <p className="mt-1 px-2 text-xs text-warning">✓ {correct}</p>
              )}
            </div>
          ) : (
            <p className="flex h-10 items-center px-3 text-sm text-muted-foreground/40 select-none">
              Déposer ici
            </p>
          )}
        </div>
      </td>
      {checked && (
        <td className="p-3 text-center">
          {ok ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <XCircle className="h-4 w-4 text-warning" />
          )}
        </td>
      )}
    </tr>
  );
}

function PoolArea({
  children,
  checked,
}: {
  children: React.ReactNode;
  checked: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "pool-area" });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-card border border-border p-3 transition-colors",
        isOver && !checked && "border-primary bg-primary/5",
      )}
    >
      <p className="mb-2 text-xs font-black uppercase text-muted-foreground">
        Options
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

export function DnDMatchingPool({
  task,
  answers,
  onAnswer,
  checked,
}: {
  task: ScenarioTask;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  checked: boolean;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = task.items ?? [];
  const pool = task.options ?? [];

  const placedSet = new Set(
    items.map((_, i) => answers[`${task.id}:${i}`]).filter(Boolean),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const src = active.id as string;
    const dst = over.id as string;

    // What is being dragged?
    const isPoolChip = src.startsWith("pool::");
    const isPlaced = src.startsWith("placed::");

    // Resolve the option label being dragged
    const draggedOption = isPoolChip
      ? src.replace("pool::", "")
      : isPlaced
      ? (() => {
          const idx = Number(src.split("::")[2]);
          return answers[`${task.id}:${idx}`] ?? "";
        })()
      : "";

    if (!draggedOption) return;

    if (dst.startsWith("slot::")) {
      const targetIdx = Number(dst.split("::")[2]);
      const targetKey = `${task.id}:${targetIdx}`;

      if (isPlaced) {
        // Slot → Slot swap
        const srcIdx = Number(src.split("::")[2]);
        const srcKey = `${task.id}:${srcIdx}`;
        const targetValue = answers[targetKey] ?? "";
        onAnswer(srcKey, targetValue);
        onAnswer(targetKey, draggedOption);
      } else {
        // Pool chip → Slot: just place it
        onAnswer(targetKey, draggedOption);
      }
    } else if (dst === "pool-area" && isPlaced) {
      // Slot → Pool: clear the slot
      const srcIdx = Number(src.split("::")[2]);
      onAnswer(`${task.id}:${srcIdx}`, "");
    }
  };

  // Label shown in DragOverlay
  const overlayLabel = activeId?.startsWith("pool::")
    ? activeId.replace("pool::", "")
    : activeId?.startsWith("placed::")
    ? (() => {
        const idx = Number(activeId.split("::")[2]);
        return answers[`${task.id}:${idx}`] ?? "";
      })()
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        {/* Slots table */}
        <div className="overflow-x-auto rounded-card border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                <th className="p-3 text-left font-black">Élément</th>
                <th className="p-3 text-left font-black">Réponse</th>
                {checked && (
                  <th className="w-8 p-3" scope="col">
                    <span className="sr-only">Résultat</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const key = `${task.id}:${i}`;
                const placed = answers[key] ?? "";
                const correct = task.expectedAnswers[i] ?? "";
                const ok = checked && placed === correct;
                const fail = checked && placed !== correct;
                return (
                  <RowSlot
                    key={i}
                    taskId={task.id}
                    itemIndex={i}
                    placed={placed}
                    item={item}
                    checked={checked}
                    ok={ok}
                    fail={fail}
                    correct={correct}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pool */}
        <PoolArea checked={checked}>
          {pool.map((opt) => (
            <PoolChip
              key={opt}
              option={opt}
              dimmed={placedSet.has(opt)}
              disabled={checked}
            />
          ))}
        </PoolArea>
      </div>

      <DragOverlay>
        {overlayLabel ? (
          <div className="rounded-card border border-border bg-card px-3 py-2 text-sm font-medium shadow-xl ring-2 ring-primary/50 cursor-grabbing">
            {overlayLabel}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// ─── 3. DnD Classification Board (cards → category columns) ──────────────────

function ClassifyItemCard({
  id,
  label,
  checked,
  ok,
  fail,
  correct,
  asOverlay,
}: {
  id: string;
  label: string;
  checked: boolean;
  ok?: boolean;
  fail?: boolean;
  correct?: string;
  asOverlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: checked,
  });

  return (
    <div
      ref={setNodeRef}
      {...(!checked ? { ...attributes, ...listeners } : {})}
      className={cn(
        "rounded-card border border-border bg-card px-3 py-2 text-sm select-none",
        !checked && "cursor-grab active:cursor-grabbing",
        isDragging && !asOverlay && "opacity-20",
        asOverlay && "shadow-xl ring-2 ring-primary/50 cursor-grabbing",
        ok && "border-success/50 bg-success/5",
        fail && "border-warning/50 bg-warning/5",
      )}
    >
      <span>{label}</span>
      {ok && (
        <CheckCircle2 className="ml-2 inline h-3.5 w-3.5 text-success" aria-hidden />
      )}
      {fail && (
        <span className="ml-2 text-xs text-warning"> → {correct}</span>
      )}
    </div>
  );
}

function CategoryDropZone({
  id,
  label,
  children,
  checked,
  unclassified,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  checked: boolean;
  unclassified?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-20 rounded-card border-2 border-dashed p-3 transition-colors",
        isOver && !checked && "border-primary bg-primary/5",
        !isOver && !unclassified && "border-border",
        !isOver && unclassified && "border-border/30",
      )}
    >
      <p
        className={cn(
          "mb-2 text-xs font-black uppercase",
          unclassified ? "text-muted-foreground/40" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

export function DnDClassificationBoard({
  task,
  answers,
  onAnswer,
  checked,
}: {
  task: ScenarioTask;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  checked: boolean;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = task.items ?? [];
  const categories = task.options ?? [];
  const UNCLASSIFIED = "__unclassified__";

  // Group item indices by their current category
  const buckets: Record<string, number[]> = { [UNCLASSIFIED]: [] };
  categories.forEach((c) => { buckets[c] = []; });
  items.forEach((_, i) => {
    const placed = answers[`${task.id}:${i}`] ?? "";
    const bucket = placed && buckets[placed] ? placed : UNCLASSIFIED;
    buckets[bucket].push(i);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const srcId = active.id as string;
    const dstId = over.id as string;

    if (!srcId.startsWith(`classify::${task.id}::`)) return;
    const itemIdx = Number(srcId.split("::")[2]);
    const key = `${task.id}:${itemIdx}`;

    if (dstId.startsWith(`cat::${task.id}::`)) {
      const cat = dstId.replace(`cat::${task.id}::`, "");
      onAnswer(key, cat);
    } else if (dstId === `${task.id}::unclassified`) {
      onAnswer(key, "");
    }
  };

  const activeIdx = activeId?.startsWith(`classify::${task.id}::`)
    ? Number(activeId.split("::")[2])
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Category columns */}
      <div
        className={cn(
          "mb-4 grid gap-3",
          categories.length === 1 && "grid-cols-1",
          categories.length === 2 && "grid-cols-2",
          categories.length === 3 && "grid-cols-3",
          (categories.length >= 4) && "grid-cols-4",
        )}
      >
        {categories.map((cat) => (
          <CategoryDropZone
            key={cat}
            id={`cat::${task.id}::${cat}`}
            label={cat}
            checked={checked}
          >
            {buckets[cat]?.map((i) => {
              const id = `classify::${task.id}::${i}`;
              const ok = checked && task.expectedAnswers[i] === cat;
              const fail = checked && task.expectedAnswers[i] !== cat;
              return (
                <ClassifyItemCard
                  key={id}
                  id={id}
                  label={items[i]}
                  checked={checked}
                  ok={ok}
                  fail={fail}
                  correct={task.expectedAnswers[i]}
                />
              );
            })}
          </CategoryDropZone>
        ))}
      </div>

      {/* Unclassified pool */}
      {buckets[UNCLASSIFIED].length > 0 && (
        <CategoryDropZone
          id={`${task.id}::unclassified`}
          label="Non classifié — faites glisser vers une catégorie"
          checked={checked}
          unclassified
        >
          {buckets[UNCLASSIFIED].map((i) => {
            const id = `classify::${task.id}::${i}`;
            return (
              <ClassifyItemCard
                key={id}
                id={id}
                label={items[i]}
                checked={checked}
              />
            );
          })}
        </CategoryDropZone>
      )}

      <DragOverlay>
        {activeIdx !== null ? (
          <ClassifyItemCard
            id="overlay"
            label={items[activeIdx] ?? ""}
            checked={false}
            asOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
