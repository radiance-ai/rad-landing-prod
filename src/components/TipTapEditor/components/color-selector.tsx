import { Editor } from '@tiptap/core';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import { Dispatch, FC, SetStateAction } from 'react';

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-highlight-default)',
  },
  {
    name: 'Purple',
    color: 'var(--novel-highlight-purple)',
  },
  {
    name: 'Red',
    color: 'var(--novel-highlight-red)',
  },
  {
    name: 'Yellow',
    color: 'var(--novel-highlight-yellow)',
  },
  {
    name: 'Blue',
    color: 'var(--novel-highlight-blue)',
  },
  {
    name: 'Green',
    color: 'var(--novel-highlight-green)',
  },
  {
    name: 'Orange',
    color: 'var(--novel-highlight-orange)',
  },
  {
    name: 'Pink',
    color: 'var(--novel-highlight-pink)',
  },
  {
    name: 'Gray',
    color: 'var(--novel-highlight-gray)',
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color }),
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color }),
  );

  return (
    <div className="relative h-full">
      <button
        type="button"
        className="flex h-full items-center gap-1 p-2 text-sm font-medium text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900 active:bg-stone-200 dark:active:bg-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="rounded-sm px-1"
          style={{
            color: activeColorItem?.color ?? undefined,
            backgroundColor: activeHighlightItem?.color ?? undefined,
          }}
        >
          A
        </span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <div className="my-1 px-2 text-sm text-stone-500 dark:text-slate-600">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== 'Default' &&
                  typeof color !== 'undefined' &&
                  color !== null &&
                  editor.chain().focus().setColor(color).run();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-200 dark:border-slate-800 px-1 py-px font-medium"
                  style={{ color: color ?? undefined }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && (
                <CheckIcon className="h-4 w-4" />
              )}
            </button>
          ))}

          <div className="mb-1 mt-2 px-2 text-sm text-stone-500 dark:text-slate-600">
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== 'Default' &&
                  typeof color !== 'undefined' &&
                  color !== null &&
                  editor.commands.setHighlight({ color: color });
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-200 dark:border-slate-800 px-1 py-px font-medium"
                  style={{ backgroundColor: color ?? undefined }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <CheckIcon className="h-4 w-4" />
              )}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
