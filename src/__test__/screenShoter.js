const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const screenDir = './test/screenshots';

class ScreenShoter {
    constructor() {
        checkDirectories()
    }

    setPage(page){
        this.page = page;
        this.setViewport();
    }

    async takeAndCompare(page, fileName) {
        await page.screenshot({ path: `${screenDir}/new/${fileName}.png` });
        return this.compare(fileName);
    }

    async compare(fileName) {
        return new Promise((resolve, reject) => {
            const img1 = fs.createReadStream(`${screenDir}/new/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
            const img2 = fs.createReadStream(`${screenDir}/original/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
      
            let filesRead = 0;
            function doneReading() {
                if (++filesRead < 2) return;
        
                expect(img1.width).toEqual(img2.width);
                expect(img1.height).toEqual(img2.height);
        
                const { width, height } = img1;
                const diff = new PNG({ width, height });
        
                const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

                if(numDiffPixels !== 0) fs.writeFileSync(`${screenDir}/diff/${fileName}.png`, PNG.sync.write(diff));
    
                expect(numDiffPixels).toEqual(0);
        
                resolve();
            }
        });
    }

    async setViewport(width, height){

        await this.page.setViewport({ width, height });

    }

}

async function checkDirectories() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(screenDir)) fs.mkdirSync(screenDir);
        if (!fs.existsSync(`${screenDir}/new`)) fs.mkdirSync(`${screenDir}/new`);
        if (!fs.existsSync(`${screenDir}/diff`)) fs.mkdirSync(`${screenDir}/diff`);
    });
}

export const screenShoter = new ScreenShoter()