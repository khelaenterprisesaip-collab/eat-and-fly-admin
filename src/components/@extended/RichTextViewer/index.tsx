import React from 'react';
import trimHtml from './trimHtml';
import { Typography } from '@mui/material';

interface RichTextViewerProps {
  html: string;
  limit?: number;
  preserveTags?: boolean;
  wordBreak?: boolean;
  suffix?: string;
  moreLink?: string;
  moreText?: string;
  showFullText?: boolean;
  showLess?: boolean;
  lessText?: string;
}

const RichTextViewer = ({
  html,
  limit,
  preserveTags,
  wordBreak,
  suffix,
  moreLink,
  showFullText,
  moreText = 'Show More...',
  showLess = true,
  lessText = '...Show Less'
}: RichTextViewerProps) => {
  const trimmedHTML = showFullText
    ? { html: html, more: false }
    : trimHtml(html, {
        limit,
        preserveTags,
        wordBreak,
        suffix,
        moreLink,
        moreText
      });

  const [showMore, setShowMore] = React.useState(false);

  return (
    <div>
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: showMore ? html : trimmedHTML.html }} />
      {trimmedHTML?.more && !showMore && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Typography sx={{ mt: 0.75, display: 'inline-block' }} component="a" onClick={() => setShowMore(true)} rel="noopener noreferrer">
          {moreText}
        </Typography>
      )}
      {showLess && trimmedHTML.more && showMore && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Typography sx={{ mt: 0.75, display: 'inline-block' }} component="a" onClick={() => setShowMore(false)} rel="noopener noreferrer">
          {lessText}
        </Typography>
      )}
    </div>
  );
};

export default RichTextViewer;
