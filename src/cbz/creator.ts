import fs from "fs";
import archiver from "archiver";
import { createComicInfo, createComicInfoXmlString } from "./comicInfo";

export const createCbz = (images: Buffer[], outputPath: string) => {
    const output = fs.createWriteStream(`${outputPath}/example.cbz`);
    const archive = archiver("zip", {
        zlib: { level: 0 }
    });
    archive.pipe(output);
    
    images.forEach((image, index) => {
        archive.append(image, { name: `${getIndexString(index)}.png` });
    });

    const comicInfo = createComicInfo(images.length)
    const comicInfoXmlString = createComicInfoXmlString(comicInfo);

    archive.append(comicInfoXmlString, { name: "ComicInfo.xml" });
    archive.finalize();
}

const getIndexString = (index: number): string => {
    if (index < 10 && index > 0) {
        return `0${index}`;
    } else {
        return index.toString();
    }
}
