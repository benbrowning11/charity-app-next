import Image from 'next/image';
import GloriaTitle from '@/components/shared/GloriaTitle';
import { NewsContentTag, TextTag, TitleTag, ImageTag, RowTag, ColumnTag } from './types';

// Render simple text content
function TextRenderer({ content }: TextTag) {
  return <p className="my-4 text-lg">{content}</p>;
}

// Render title content
function TitleRenderer({ content }: TitleTag) {
  return (
    <GloriaTitle as="h2" size="3xl" color="black" className="my-6">
      {content}
    </GloriaTitle>
  );
}

// Render image content
function ImageRenderer({ src, alt = 'News image' }: ImageTag) {
  return (
    <div className="w-full my-6">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full h-auto rounded-lg object-contain"
        style={{ maxHeight: '600px' }}
      />
    </div>
  );
}

// Render column content
function ColumnRenderer({ content }: ColumnTag) {
  return (
    <div className="flex-1 min-w-0">
      {content.map((item, index) => (
        <ContentRenderer key={item.id || `column-item-${index}`} tag={item} />
      ))}
    </div>
  );
}

// Render row content
function RowRenderer({ content }: RowTag) {
  // If there's only one column, make it full width
  const isSingleColumn = content.length === 1;

  return (
    <div className={`flex flex-col ${isSingleColumn ? '' : 'md:flex-row'} gap-6 my-6`}>
      {content.map((item, index) => (
        <ContentRenderer key={item.id || `row-item-${index}`} tag={item} />
      ))}
    </div>
  );
}

// Main content renderer component
export default function ContentRenderer({ tag }: { tag: NewsContentTag }) {
  switch (tag.type) {
    case 'text':
      return <TextRenderer {...(tag as TextTag)} />;
    case 'title':
      return <TitleRenderer {...(tag as TitleTag)} />;
    case 'image':
      return <ImageRenderer {...(tag as ImageTag)} />;
    case 'row':
      return <RowRenderer {...(tag as RowTag)} />;
    case 'column':
      return <ColumnRenderer {...(tag as ColumnTag)} />;
    default:
      return null;
  }
}
