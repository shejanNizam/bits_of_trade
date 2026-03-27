// "use client";

// import { Button, Input, Tabs } from "antd";
// import { useState } from "react";
// import { CiSquarePlus } from "react-icons/ci";
// import { FaSearch } from "react-icons/fa";
// import CommunityTab from "../components/improve/strategyLibrary/CommunityTab";
// import CreateStrategyModal from "../components/improve/strategyLibrary/CreateStrategyModal";
// import MyStrategiesTab from "../components/improve/strategyLibrary/MyStrategiesTab";
// import TemplatesTab from "../components/improve/strategyLibrary/TemplatesTab";

// export default function StrategyLibraryPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const items = [
//     { key: "1", label: "My Strategies", children: <MyStrategiesTab /> },
//     { key: "2", label: "Community", children: <CommunityTab /> },
//     { key: "3", label: "Templates", children: <TemplatesTab /> },
//   ];

//   return (
//     <div className="min-h-screen transition-colors duration-300">
//       <div className="w-full mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//               Strategy Library
//             </h1>
//             <p className="text-slate-500 dark:text-zinc-400">
//               Build, test, and share strategies. Track maturity and sample size.
//             </p>
//           </div>
//           <Button
//             type="primary"
//             icon={<CiSquarePlus size={18} />}
//             onClick={() => setIsModalOpen(true)}
//           >
//             Create Strategy
//           </Button>
//         </div>

//         {/* Search & Filter Bar */}
//         <div className="bg-white dark:bg-primary/10 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm mb-6">
//           <Input
//             prefix={<FaSearch className="text-slate-400" size={18} />}
//             placeholder="Search strategies by name, tags, segment..."
//             className="h-11 rounded-lg dark:bg-primary/10 dark:border-zinc-700 dark:text-white"
//           />
//         </div>

//         {/* Tabs Section */}
//         <div className="relative">
//           {/* <div className="absolute right-0 top-1 z-10 hidden md:flex items-center gap-2">
//             <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200 dark:border-zinc-700">
//               <button className="p-1.5 rounded bg-white dark:bg-zinc-700 shadow-sm">
//                 <LuLayoutGrid size={16} className="dark:text-white" />
//               </button>
//               <button className="p-1.5 rounded text-slate-500">
//                 <CiBoxList size={16} />
//               </button>
//             </div>
//           </div> */}

//           <Tabs
//             defaultActiveKey="1"
//             items={items}
//             className="custom-strategy-tabs"
//           />
//         </div>
//       </div>

//       <CreateStrategyModal
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// }

// StrategyLibraryPage.tsx (updated)
"use client";

import { Strategy } from "@/types/strategy";
import { Button, Input, Tabs } from "antd";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import CommunityTab from "../components/improve/strategyLibrary/CommunityTab";
import CreateStrategyModal from "../components/improve/strategyLibrary/CreateStrategyModal";
import MyStrategiesTab from "../components/improve/strategyLibrary/MyStrategiesTab";
import TemplatesTab from "../components/improve/strategyLibrary/TemplatesTab";

export default function StrategyLibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStrategy, setEditStrategy] = useState<Strategy | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEditStrategy = (strategy: Strategy) => {
    setEditStrategy(strategy);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditStrategy(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditStrategy(null);
  };

  const handleModalSuccess = () => {
    handleModalClose();
    // Trigger refresh in MyStrategiesTab
    setRefreshTrigger((prev) => prev + 1);
  };

  const items = [
    {
      key: "1",
      label: "My Strategies",
      children: (
        <MyStrategiesTab
          onEditStrategy={handleEditStrategy}
          key={refreshTrigger} // This will force re-render when refreshTrigger changes
        />
      ),
    },
    { key: "2", label: "Community", children: <CommunityTab /> },
    { key: "3", label: "Templates", children: <TemplatesTab /> },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Strategy Library
            </h1>
            <p className="text-slate-500 dark:text-zinc-400">
              Build, test, and share strategies. Track maturity and sample size.
            </p>
          </div>
          <Button
            type="primary"
            icon={<CiSquarePlus size={18} />}
            onClick={handleCreateNew}
          >
            Create Strategy
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-primary/10 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm mb-6">
          <Input
            prefix={<FaSearch className="text-slate-400" size={18} />}
            placeholder="Search strategies by name, tags, segment..."
            className="h-11 rounded-lg dark:bg-primary/10 dark:border-zinc-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs Section */}
        <div className="relative">
          <Tabs
            defaultActiveKey="1"
            items={items}
            className="custom-strategy-tabs"
          />
        </div>
      </div>

      <CreateStrategyModal
        open={isModalOpen}
        onCancel={handleModalClose}
        initialData={editStrategy}
        isEditMode={!!editStrategy}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
