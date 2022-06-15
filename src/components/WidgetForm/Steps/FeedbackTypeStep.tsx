import { Moon, Sun } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeProps {
  onFeedbackTypeChange: (type: FeedbackType) => void;
  onFeedbackChangeColorMode: () => void;
  mode: boolean;
}

export function FeedbackTypeStep({
  onFeedbackTypeChange,
  onFeedbackChangeColorMode,
  mode
}: FeedbackTypeProps) {

  return (
    <>
      <header>  
        <button 
          onClick={onFeedbackChangeColorMode}
          type="button" 
          className="absolute top-5 left-5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100" 
          title="Mudar cor de tema"
        >
          { mode ? 
             <Sun weight="bold" className="w-4 h-4" />
            :
            <Moon weight="bold" className="w-4 h-4" />
          }
        </button>
        <span className="text-xl leading-6 text-zinc-800  dark:text-zinc-100">Deixe seu feedback</span>
        <CloseButton/>
      </header>
      <div className="flex py-8 gap-2 w-full">
        {
          Object.entries(feedbackTypes).map(([key, value])=>{
            return (
              <button key={key} 
                className="bg-zinc-100 dark:bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                type="button"
                onClick={()=>onFeedbackTypeChange(key as FeedbackType)}
              >
                <img src={value.image.source} alt={value.image.alt} />
                <span className="text-zinc-800 dark:text-zinc-100">{value.title}</span>
              </button>
            );
          })
        }
      </div>
    </>
  )
}
