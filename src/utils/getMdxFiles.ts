import fs from 'fs';
import path from 'path';

export async function getMdxFiles(cardsPath: string = 'src/app/team/cards') {
  const cardsDirectory = path.join(process.cwd(), cardsPath);
  
  try {
    const fileNames = fs.readdirSync(cardsDirectory);
    return fileNames
      .filter(file => path.extname(file) === '.mdx')
      .map(file => path.basename(file, '.mdx'));
  } catch (error) {
    console.error('Error reading cards directory:', error);
    return [];
  }
}