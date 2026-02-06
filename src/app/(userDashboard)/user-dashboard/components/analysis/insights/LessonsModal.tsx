import { Modal, ModalProps } from "antd";
import {
  IoCheckmarkCircle,
  IoClose,
  IoDocumentTextOutline,
  IoPlayCircleOutline,
  IoTimeOutline,
} from "react-icons/io5";

interface LessonRowProps {
  title: string;
  dur: string;
  level: string;
  type: string;
  active?: boolean;
  completed?: boolean;
  isArticle?: boolean;
}

export default function LessonsModal({ open, onCancel }: ModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
      width={700}
      centered
      styles={{ body: { padding: 0 } }}
    >
      <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl">
        <div className="flex justify-between items-start mb-6 text-slate-900 dark:text-white">
          <div className="flex gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600">
              <IoPlayCircleOutline size={26} />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">
                Quick Recovery Lessons
              </h2>
              <p className="text-sm text-slate-400 font-medium">
                Bounce back faster from violations
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/20 grid grid-cols-1 sm:grid-cols-3 p-6 rounded-3xl mb-8 gap-4">
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
              3.2
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest leading-none">
              Current DRT
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-500 leading-none">
              2.0
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest leading-none">
              Target DRT
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-3xl font-black text-orange-500 leading-none">
              37%
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest leading-none">
              Improvement needed
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-[40vh] overflow-y-auto">
          <LessonRow
            title="The 5-Minute Reset Protocol"
            dur="5:32"
            level="Beginner"
            type="Video"
            active
          />
          <LessonRow
            title="Breaking the Violation Cycle"
            dur="8:15"
            level="Intermediate"
            type="Video"
            completed
          />
          <LessonRow
            title="Post-Loss Checklist"
            dur="3 min read"
            level="Beginner"
            type="Article"
            isArticle
          />
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-2xl mt-6">
          <p className="text-[11px] font-black text-orange-800 dark:text-orange-400 uppercase flex items-center gap-2 mb-1">
            🍱 RECOMMENDED FOR YOU
          </p>
          <p className="text-xs text-orange-700 dark:text-orange-500 font-medium leading-relaxed">
            Based on your DRT of 3.2, start with The 5-Minute Reset Protocol.
          </p>
        </div>
      </div>
    </Modal>
  );
}

const LessonRow = ({
  title,
  dur,
  level,
  type,
  active,
  completed,
  isArticle,
}: LessonRowProps) => (
  <div
    className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${active ? "border-slate-900 dark:border-white bg-white dark:bg-slate-800 ring-1 ring-slate-900 dark:ring-white" : "border-slate-100 dark:border-slate-800"}`}
  >
    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl text-purple-600 dark:text-purple-400">
      {isArticle ? (
        <IoDocumentTextOutline size={22} />
      ) : (
        <IoPlayCircleOutline size={22} />
      )}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
          {title}
        </h4>
        {completed && (
          <IoCheckmarkCircle className="text-emerald-500 text-xl" />
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold flex items-center gap-1">
          <IoTimeOutline /> {dur}
        </span>
        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">
          {level}
        </span>
        <span className="text-[10px] bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded font-bold">
          {type}
        </span>
      </div>
    </div>
  </div>
);
