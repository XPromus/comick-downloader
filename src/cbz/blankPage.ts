import { Jimp } from "jimp";

export const getBlankPage = async (
    width: number, 
    height: number
): Promise<Buffer> => {
    return await new Jimp({
        width: width,
        height: height,
        color: 0xffffffff
    }).getBuffer("image/png");
}
