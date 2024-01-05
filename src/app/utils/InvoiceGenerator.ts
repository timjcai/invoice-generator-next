import { saveAs } from "file-saver";
import { AlignmentType, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx"
import { GeneratorType } from "../types";
import { displayABN } from ".";

export async function generateInvoice(data: Partial<GeneratorType>) {
    console.log(data)
    const doc = new Document({
        sections: [{
            children: [
                new Table({
                    columnWidths: [3500, 3500,2000,2000],
                    borders: {
                        top: {
                            style: 'none',
                            color: "#ffffff",
                        }, left: {
                            style: 'none',
                            color: "#ffffff",
                        }, right: {
                            style: 'none',
                            color: "#ffffff",
                        }, insideVertical: {
                            style: 'none',
                            color: "#ffffff",
                        }, bottom: {
                            style: 'thick',
                            size: 12,
                            color: "#000000"
                        }
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    columnSpan: 2,
                                    borders: {
                                        right: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [new Paragraph('logo')]
                                }),
                                new TableCell({
                                    columnSpan: 2,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Invoice Number: ${data.invoiceDetails ? data.invoiceDetails?.invoiceNumber : ""}`, size: 32, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessName}`, break: 1, bold: true, font: 'Damascus'}),
                                                new TextRun({text: `ABN: ${displayABN(data.profileDetails?.ABN)}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessLocation?.streetLine1}, ${data.profileDetails?.businessLocation?.streetLine2 ? `${data.profileDetails?.businessLocation?.streetLine2},` : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessLocation?.suburb} ${data.profileDetails?.businessLocation?.state} ${data.profileDetails?.businessLocation?.postcode}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessLocation?.country}`, break: 1, font: 'Damascus'}),
                                            ],
                                        })
                                ]
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Bill To:`, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails ? data.billerDetails?.businessName : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `ABN: ${data.billerDetails ? data.billerDetails?.ABN  : ""}`, break: 1, font: 'Damascus'}),
                                            ],
                                        }),
                            ],
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Ship To:`, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.streetLine1} ${data.billerDetails?.businessLocation?.streetLine2 ? data.billerDetails?.businessLocation?.streetLine2 : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.suburb} ${data.billerDetails?.businessLocation?.state} ${data.billerDetails?.businessLocation?.postcode}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.country}`, break: 1, font: 'Damascus'}),
                                            ],
                                        }),
                            ],
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `hello: ${data.invoiceDetails ? data.invoiceDetails?.invoiceNumber : ""}`, size: 32, font: 'Damascus'}),
                                            ],
                                        }),
                            ],
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `hello: ${data.invoiceDetails ? data.invoiceDetails?.invoiceNumber : ""}`, size: 32, font: 'Damascus'}),
                                            ],
                                        }),
                            ],
                                }),
            ], })
            ],
        })
    ]}]})

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'TestInvoice.docx')
    // Packer.toBuffer(doc).then((buffer)=>{
    //     fs.writeFileSync("testtext.docx", buffer)
    // })
}
