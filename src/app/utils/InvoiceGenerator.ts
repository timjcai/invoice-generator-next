import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx"

export async function generateInvoice() {
    alert('generating invoice')
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [new TextRun("Hello World")],
                }),
            ],
        },{
            children: [
                new Paragraph({
                    children: [new TextRun("Hello World")],
                }),
            ],
        },{
            children: [
                new Paragraph({
                    children: [new TextRun("Hello World")],
                }),
            ],
        }]
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'TestInvoice.docx')
}
