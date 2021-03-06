import { FormEvent, useState } from 'react';
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import ScreenshotButton from "../ScreenshotButton";
import { api } from '../../../lib/api';
import { Loading } from '../../Loading';

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedBackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType, 
  onFeedbackRestartRequested,
  onFeedBackSent
}: FeedbackContentStepProps){
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  
  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();

    setIsSendingFeedback(true);
    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    });
    setIsSendingFeedback(false);
    onFeedBackSent();
  }

  return (
    <>
      <header> 
        <button 
          onClick={onFeedbackRestartRequested}
          type="button" 
          className="absolute top-5 left-5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton/>
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea 
          name="comment" id="comment"
          onChange={event => setComment(event.target.value)}
          value={comment}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-500
          dark:placeholder-zinc-400 text-zinc-800 border-zinc-500 dark:text-zinc-100 dark:border-zinc-400 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que est?? acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
