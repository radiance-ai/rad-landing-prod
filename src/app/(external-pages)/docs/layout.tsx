import { DocsNavigation } from '@/components/ui/NavigationMenu/ExternalNavbar/DocsNavigation';
import './layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex w-full justify-center sm:px-8 lg:px-6 xl:px-8">
      <div className="hidden lg:relative lg:block lg:flex-none">
        <div className="absolute inset-y-0 right-0 top-16 dark:hidden border-r border-gray-200" />
        <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
        <div className="absolute bottom-0 right-0 top-16 hidden w-px bg-slate-800 dark:block" />
        <div className="sticky top-[1rem] h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-20 xl:w-72 xl:pr-8">
          <DocsNavigation />
        </div>
      </div>
      {children}
    </div>
  );
}
