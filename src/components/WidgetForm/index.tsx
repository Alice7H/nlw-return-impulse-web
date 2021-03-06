import { useEffect, useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG: {
      title: 'Problema',
      image: {
        source: bugImageUrl,
        alt: 'Imagem de um inseto'
      }
    },
    IDEA: {
      title: 'Ideia',
      image: {
        source: ideaImageUrl,
        alt: 'Imagem de uma Lâmpada'
      }
    },
    OTHER: {
      title: 'Outro',
      image: {
        source: thoughtImageUrl,
        alt: 'Imagem de um balão de pensamento'
      }
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackDarkMode, setFeedbackDarkMode] = useState(true);

  useEffect(()=>{
    const element = document.querySelector('html')!;
    if(feedbackDarkMode) {
      element.classList.add('dark');
    }else{
      element.classList.remove('dark');
    }
    
  },[feedbackDarkMode])


  function handleRestartFeedback(){
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">   
     { feedbackSent ? <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/> 
     :  <>
        { !feedbackType 
          ? <FeedbackTypeStep 
              onFeedbackTypeChange={setFeedbackType} 
              onFeedbackChangeColorMode={()=>setFeedbackDarkMode(!feedbackDarkMode)}
              mode={feedbackDarkMode}
            /> 
          : <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedBackSent={()=> setFeedbackSent(true)}
            />
        }
        </>
     }

      <footer className="text-xs text-zinc-500  dark:text-neutral-400">
        Feito com ♥ pela <a href="https://github.com/Alice7H" target="_blank" className="underline underline-offset-2">Alice Hata</a>
      </footer> 
    </div>
  )
}
