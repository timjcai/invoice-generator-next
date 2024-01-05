import { saveAs } from "file-saver";
import { AlignmentType, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx"

export async function generateInvoice(data) {
    console.log(data)
    const doc = new Document({
        sections: [{
            children: [
                new Table({
                    columnWidths: [6000, 2000],
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
                                    borders: {
                                        right: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [new Paragraph('logo')]
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
                                                new TextRun({text: 'Invoice Number #1'}),
                                                new TextRun({text: 'Business Name', break: 1}),
                                                new TextRun({text: 'ABN: 12 123 123 123', break: 1}),
                                                new TextRun({text: '45 Wallaby Way', break: 1}),
                                                new TextRun({text: 'Sydney NSW 2000', break: 1}),
                                                new TextRun({text: 'Australia', break: 1}),
                                            ],
                                        })
                                ]
                                }),
                            ],
                        }),
            ], width: {
                size: 4535,
            }})
            ],
        }
    ]})

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'TestInvoice.docx')
    // Packer.toBuffer(doc).then((buffer)=>{
    //     fs.writeFileSync("testtext.docx", buffer)
    // })
}
