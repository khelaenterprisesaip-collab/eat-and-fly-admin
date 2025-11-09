import React from 'react';

const ExternalLink = ({ link, text }: { link: string; text?: string }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {text || link}
    </a>
  );
};

export default ExternalLink;