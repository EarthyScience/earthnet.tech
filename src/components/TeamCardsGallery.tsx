import { getMdxFiles } from '@/utils/getMdxFiles';
import dynamic from 'next/dynamic';

interface TeamCardsGalleryProps {
  path?: string;
  title?: string;
}

export default async function TeamCardsGallery({ 
  path: cardPath = 'project/team/cards',
  title = "Our Team"
}: TeamCardsGalleryProps) {
  const cardNames = await getMdxFiles(`src/app/${cardPath}`);

  return (
    <div className="container mx-auto max-w-screen-lg py-4">
      <h1 className="text-3xl font-bold text-center -mb-6">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 justify-center">
        {cardNames.map((name) => {
          const MDXComponent = dynamic(() => import(`../app/${cardPath}/${name}.mdx`));
          return (
            <div key={name} className="w-full max-w-[300px] transform transition-all hover:scale-105 -mb-14">
              <MDXComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
