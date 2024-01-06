import { saveAs } from "file-saver";
import { AlignmentType, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, convertMillimetersToTwip } from "docx"
import { GeneratorType } from "../types";
import { displayABN } from ".";

export async function generateInvoice(data: Partial<GeneratorType>) {
    console.log(data)
    const doc = new Document({
        sections: [{
            children: [
                new Table({
                    columnWidths: [3500, 3500,2000,2000],
                    margins: {bottom: convertMillimetersToTwip(10)},
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
                                                new TextRun({text: `Bill To:`, break: 1, font: 'Damascus'}),
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
                                                new TextRun({text: `Ship To:`, font: 'Damascus', break: 1}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.streetLine1} ${data.billerDetails?.businessLocation?.streetLine2 ? data.billerDetails?.businessLocation?.streetLine2 : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.suburb} ${data.billerDetails?.businessLocation?.state} ${data.billerDetails?.businessLocation?.postcode}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.country}`, break: 1, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
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
                                                new TextRun({text: `Invoice #: ${data.invoiceDetails?.invoiceNumber ? data.invoiceDetails?.invoiceNumber : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Work Date: ${data.invoiceDetails?.workDate ? data.invoiceDetails?.workDate?.toDateString() : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Due Date: ${data.invoiceDetails?.dueDate ? data.invoiceDetails?.dueDate?.toDateString() : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `PO Number: ${data.invoiceDetails?.PONumber ? data.invoiceDetails?.PONumber : ""}`, break: 1, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                            ], 
                        }),
                    ],
                }),
                new Table({
                    columnWidths: [1833,1833,1833,1833,1833,1833],
                    borders: {
                        top: {
                            style: 'none',
                            size: 0,
                            color: "#FFFFFF",
                        }, left: {
                            style: 'none',
                            size: 0,
                            color: "#FFFFFF",
                        }, right: {
                            style: 'none',
                            size: 0,
                            color: "#FFFFFF",
                        }, insideVertical: {
                            style: 'none',
                            size: 0,
                            color: "#FFFFFF",
                        }, bottom: {
                            style: 'none',
                            size: 0,
                            color: "#FFFFFF"
                        }, insideHorizontal: {
                            style: 'none',
                            size: 0,
                            color: "#FFFFFF",
                        }
                    },
                    rows: [
                        new TableRow({
                            tableHeader: true,
                            children: [
                                new TableCell({
                                    columnSpan: 3,
                                    borders: {
                                        top: {style: 'single', size: 5, color: '#000000'}, 
                                        bottom: {style: 'single', size: 5, color: '#000000'}, 
                                        left: {style: 'single', size: 5, color: '#000000'}, 
                                        right: {style: 'single', size: 5, color: '#000000'},
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: 'Description', break: 1, font: 'Damascus', bold: true}),
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        top: {style: 'single', size: 5, color: '#000000'}, 
                                        bottom: {style: 'single', size: 5, color: '#000000'}, 
                                        left: {style: 'single', size: 5, color: '#000000'}, 
                                        right: {style: 'single', size: 5, color: '#000000'},
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: 'Quantity', break: 1, font: 'Damascus', bold: true}),
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        top: {style: 'single', size: 5, color: '#000000'}, 
                                        bottom: {style: 'single', size: 5, color: '#000000'}, 
                                        left: {style: 'single', size: 5, color: '#000000'}, 
                                        right: {style: 'single', size: 5, color: '#000000'},
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: 'Rate', break: 1, font: 'Damascus', bold: true}),
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        top: {style: 'single', size: 5, color: '#000000'}, 
                                        bottom: {style: 'single', size: 5, color: '#000000'}, 
                                        left: {style: 'single', size: 5, color: '#000000'}, 
                                        right: {style: 'single', size: 5, color: '#000000'},
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: 'Total', break: 1, font: 'Damascus', bold: true}),
                                            ]
                                        })
                                    ]
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    columnSpan: 3,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Description details`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Quantity`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Rate`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Total`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                            ], 
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    columnSpan: 3,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Description details`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Quantity`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Rate`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    columnSpan: 1,
                                    borders: {
                                        left: {
                                            style: 'none',
                                            color: "#ffffff",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Total`, font: 'Damascus'}),
                                            ],
                                        }),
                                    ],
                                }),
                            ], 
                        }),
                    ],
                })
            ]
        }]
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'TestInvoice.docx')
    // Packer.toBuffer(doc).then((buffer)=>{
    //     fs.writeFileSync("testtext.docx", buffer)
    // })
}
