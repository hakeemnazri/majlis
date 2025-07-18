"use client";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import React from "react";
import { Check } from 'lucide-react';

type StageIndicatorProps = {
  stages: string[];
  currentStage: number;
}

function FormStage() {
  const { formPage } = useBuildFormStore((state) => state);
  return <StageIndicator stages={["1", "2", "3", "4"]} currentStage={formPage} />;
}

export default FormStage;


const StageIndicator = ({ 
  stages, 
  currentStage,
} : StageIndicatorProps) => {

  return (
      <section className="flex items-center justify-center w-full px-10">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center w-full last:w-auto">
            <div className="flex flex-col items-center ">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  index < currentStage
                    ? 'bg-green-500 text-white'
                    : index === currentStage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentStage ? (
                  <Check size={20} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    index <= currentStage ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {/* {stage} */}
                </div>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="w-full mx-4">
                <div
                  className={`h-0.5 transition-all duration-300 ${
                    index < currentStage ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </section>
  );
};
