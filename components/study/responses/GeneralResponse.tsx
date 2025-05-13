import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Stethoscope, Microscope, Copy, Download, ExternalLink, Zap } from "lucide-react"
import React, { useRef } from "react";

interface GeneralResponseProps {
  responseData: string;
}

// Helper: Minimal Markdown to HTML converter (supports headings, bold, italics, lists, code, tables)
function miniMarkdownToHtml(text: string): string {
  if (!text) return '';
  let html = text;
  // Headings
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  // Inline code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
  // Unordered lists
  html = html.replace(/^(\s*)[-*] (.*)$/gim, '$1<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>\s*)+/gim, match => `<ul>${match}</ul>`);
  // Ordered lists
  html = html.replace(/^(\s*)\d+\. (.*)$/gim, '$1<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>\s*)+/gim, match => `<ol>${match}</ol>`);
  // Tables (very basic: | col | col |...)
  if (html.includes('|')) {
    html = html.replace(/^(\|.+\|)\s*\n((\|[-: ]+\|)\s*\n)?((\|.*\|\s*\n?)*)/gm, (match) => {
      const rows = match.trim().split('\n').filter(Boolean);
      if (rows.length < 2) return match;
      const header = rows[0].replace(/\|/g, '</th><th>').replace(/^<\/th>/, '').replace(/<th>$/, '');
      const body = rows.slice(2).map(row => '<tr>' + row.replace(/\|/g, '</td><td>').replace(/^<\/td>/, '').replace(/<td>$/, '') + '</tr>').join('');
      return `<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
    });
  }
  // Line breaks for remaining newlines
  html = html.replace(/\n/g, '<br />');
  // Wrap all tables in a responsive div and inject action bar after each table
  html = html.replace(/<table([\s\S]*?)<\/table>/g, match => {
    return `<div class="table-responsive">${match}</div><div class="response-actions" data-table-actions>
      <button class="icon-btn" data-action="copy" tabindex="0">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
        <span class="custom-tooltip">Copy Table</span>
      </button>
      <button class="icon-btn" data-action="download" tabindex="0">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m0 0l-5-5m5 5l5-5"/><rect x="5" y="19" width="14" height="2" rx="1"/></svg>
        <span class="custom-tooltip">Download as PNG</span>
      </button>
    </div>`;
  });
  return html;
}

export default function GeneralResponse({ responseData }: GeneralResponseProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Event delegation for copy/download actions
  const handleActionClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const actionBtn = target.closest('button.icon-btn[data-action]') as HTMLButtonElement | null;
    if (!actionBtn) return;
    const action = actionBtn.getAttribute('data-action');
    // Find the previous table for this action bar
    const actionBar = actionBtn.closest('.response-actions');
    if (!actionBar) return;
    const tableDiv = actionBar.previousElementSibling as HTMLDivElement | null;
    if (!tableDiv || !tableDiv.classList.contains('table-responsive')) return;
    const table = tableDiv.querySelector('table');
    if (!table) return;

    if (action === 'copy') {
      // Copy table as text
      let text = '';
      for (const row of table.rows) {
        const cells = Array.from(row.cells).map(cell => cell.textContent?.trim() || '');
        text += cells.join('\t') + '\n';
      }
      navigator.clipboard.writeText(text);
    } else if (action === 'download') {
      // Download table as PNG using html-to-image (dynamically import to avoid type error)
      try {
        const htmlToImage = await import('html-to-image');
        const dataUrl = await htmlToImage.toPng(tableDiv, { backgroundColor: '#fff' });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'table.png';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
      } catch (err) {
        alert('Failed to generate image.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Response Header - This could be dynamic later */}
      <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 dark:bg-primary-900/20 dark:border-primary-800">
        <h3 className="font-medium text-primary-800 mb-2 dark:text-primary-300">Agent Response</h3>
        {/* Source badges and timing could be dynamic if API provides such info or derived */}
        {/* <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300"
          >
            Gemini API
          </Badge>
        </div> */}
        {/* <p className="text-sm text-gray-600 dark:text-gray-400">
          Response generated.
        </p> */}
      </div>

      {/* Response Content - Displaying the actual responseData as HTML */}
      <div
        className="space-y-4 prose dark:prose-invert max-w-none"
        ref={contentRef}
        onClick={handleActionClick}
        dangerouslySetInnerHTML={{ __html: miniMarkdownToHtml(responseData) }}
      />

      {/* Response Actions - Keep for future functionality */}
      {/* <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1 dark:border-gray-700 dark:text-gray-300">
            <Copy className="h-3 w-3" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1 dark:border-gray-700 dark:text-gray-300">
            <Download className="h-3 w-3" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1 dark:border-gray-700 dark:text-gray-300">
            <ExternalLink className="h-3 w-3" />
            Expand
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-accent-600 border-accent-200 hover:bg-accent-50 dark:text-accent-400 dark:border-accent-800 dark:hover:bg-accent-900/20"
          >
            <Zap className="h-3 w-3 mr-1 text-accent-500" />
            Show high-yield facts
          </Button>
        </div>
      </div> */}
    </div>
  )
}
