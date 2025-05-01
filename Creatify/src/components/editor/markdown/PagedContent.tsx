import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { debounce } from '@/lib/utils/debounce';

interface PagedContentProps {
  html: string;
}

export function PagedContent({ html }: PagedContentProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [scale, setScale] = useState(1);
  const measureRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measureContent = useCallback(() => {
    if (!measureRef.current) return;
    
    const container = measureRef.current;
    container.innerHTML = html;
    
    const A4_HEIGHT = 1123;
    const elements = Array.from(container.children);
    const pages: string[] = [''];
    let currentPageHeight = 0;
    let currentPageIndex = 0;

    elements.forEach((element) => {
      const elementHeight = element.getBoundingClientRect().height;
      
      if (element.tagName === 'P' && currentPageHeight + elementHeight > A4_HEIGHT) {
        const originalText = element.textContent || '';
        const words = originalText.split(' ');
        let currentLine = '';
        let remainingHeight = A4_HEIGHT - currentPageHeight;
        let lineHeight = elementHeight / (originalText.length / 50);
        let currentPageContent: string[] = [];
        let nextPageContent: string[] = [];
        let heightAccumulator = 0;

        words.forEach((word) => {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          heightAccumulator += lineHeight;

          if (heightAccumulator <= remainingHeight) {
            currentLine = testLine;
            currentPageContent.push(word);
          } else {
            nextPageContent.push(word);
          }
        });

        if (currentPageContent.length > 0) {
          pages[currentPageIndex] += `<p>${currentPageContent.join(' ')}</p>`;
        }
        if (nextPageContent.length > 0) {
          pages.push(`<p>${nextPageContent.join(' ')}</p>`);
          currentPageIndex++;
          currentPageHeight = lineHeight * (nextPageContent.length / 10);
        }
      } else if (currentPageHeight + elementHeight <= A4_HEIGHT) {
        pages[currentPageIndex] += element.outerHTML;
        currentPageHeight += elementHeight;
      } else {
        pages.push(element.outerHTML);
        currentPageIndex++;
        currentPageHeight = elementHeight;
      }
    });

    setPages(pages);
  }, [html]);

  const debouncedMeasure = debounce(measureContent, 100);

  useEffect(() => {
    const updateScale = debounce(() => {
      const previewPane = document.querySelector('.preview-pane');
      if (previewPane) {
        const availableWidth = previewPane.clientWidth - 64;
        const pageWidth = 794;
        setScale(Math.min(1, availableWidth / pageWidth));
      }
    }, 100);

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new ResizeObserver(debouncedMeasure);
    observerRef.current.observe(measureRef.current);

    // Initial measurement
    debouncedMeasure();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [debouncedMeasure]);

  return (
    <>
      <div 
        ref={measureRef} 
        className="absolute opacity-0 pointer-events-none"
        style={{ width: '794px' }}
      />
      <div 
        className="preview-pane flex flex-col items-center gap-8 min-h-full p-8"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        {pages.map((pageContent, index) => (
          <div
            key={index}
            className={cn(
              "w-[794px] h-[1123px]",
              "bg-white rounded-lg shadow-lg",
              "relative overflow-hidden"
            )}
          >
            <div className="absolute inset-0 border border-zinc-200 rounded-lg pointer-events-none" />
            <div 
              className={cn(
                "p-16",
                "prose prose-zinc max-w-none",
                "prose-headings:text-zinc-900",
                "prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-2",
                "prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4",
                "prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3",
                "prose-p:text-zinc-700 prose-p:leading-relaxed",
                "prose-li:text-zinc-700",
                "prose-strong:text-zinc-900 prose-strong:font-semibold",
                "prose-hr:my-6"
              )}
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
            <div className="absolute bottom-4 right-4 text-xs text-zinc-400">
              Page {index + 1} of {pages.length}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}