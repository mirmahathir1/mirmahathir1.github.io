const path = require('path');
const puppeteer = require('puppeteer');

const CV_HTML_PATH = path.join(__dirname, '..', 'cv.html');
const OUTPUT_PDF_PATH = path.join(__dirname, '..', 'CV - Mir Mahathir Mohammad.pdf');

async function generateCvPdf() {
	const browser = await puppeteer.launch();
	try {
		const page = await browser.newPage();
		await page.goto(`file:${CV_HTML_PATH.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

		await page.pdf({
			path: OUTPUT_PDF_PATH,
			format: 'A3',
			printBackground: true,
			displayHeaderFooter: false,
			margin: { top: '0.7in', bottom: '0.7in', left: '0.7in', right: '0.7in' },
		});
	} finally {
		await browser.close();
	}

	console.log(`CV PDF generated at: ${OUTPUT_PDF_PATH}`);
}

generateCvPdf().catch((error) => {
	console.error(error);
	process.exit(1);
});
