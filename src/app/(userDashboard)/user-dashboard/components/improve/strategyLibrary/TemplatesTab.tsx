import { Button } from "antd";
import { IoMdTrendingUp } from "react-icons/io";

export default function TemplatesTab() {
  return (
    <div className="min-h-100 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-primary/10 rounded-3xl border-2 border-dashed border-slate-200 dark:border-zinc-800 mt-4">
      <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
        <IoMdTrendingUp className="text-slate-400" size={32} />
      </div>
      <h3 className="text-xl font-bold dark:text-white">Strategy Templates</h3>
      <p className="text-slate-500 dark:text-zinc-400 mt-2 mb-6 max-w-xs">
        Start with proven strategy templates and customize them to your style.
      </p>
      <Button
        type="primary"
        size="large"
        className="bg-blue-600 px-8 rounded-xl h-12 font-bold"
      >
        Browse Templates
      </Button>
    </div>
  );
}
