import { CodeBlock } from './CodeBlock';

interface MessageFormatterProps {
  content: string;
}

export const MessageFormatter = ({ content }: MessageFormatterProps) => {
  // Split content by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {parts.map((part, index) => {
        // Check if it's a code block
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.split('\n');
          const language = lines[0].replace('```', '').trim() || 'text';
          const code = lines.slice(1, -1).join('\n');
          
          return <CodeBlock key={index} code={code} language={language} />;
        }

        // Format regular text with markdown-like features
        const formatted = part
          // Bold text with **
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // Italic text with *
          .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>')
          // Headings with *
          .replace(/^\*\s+(.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
          // Line breaks
          .replace(/\n/g, '<br/>');

        return (
          <div 
            key={index} 
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      })}
    </div>
  );
};
