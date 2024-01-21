import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, convertMillimetersToTwip } from "docx"
import { GeneratorType } from "../types";
import { displayABN, displayCurrency, displayPercentage } from ".";

export async function generateInvoice(data: Partial<GeneratorType>) {
    console.log(data)

    const lineItemRows = (): TableRow[] => {
        const tableRows: TableRow[] = [
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
        ];
        data.lineItems!.forEach((lineItem)=>{
            tableRows.push(new TableRow({
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
                                    new TextRun({text: `${lineItem.description}`, break: 1, font: 'Damascus'}),
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
                                    new TextRun({text: `${lineItem.quantity}`, break: 1, font: 'Damascus'}),
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
                                    new TextRun({text: `${displayCurrency(lineItem.rate,"AUD")}`, break: 1, font: 'Damascus'}),
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
                                    new TextRun({text: `${displayCurrency(lineItem.rate * lineItem.quantity, "AUD")}`, break: 1, font: 'Damascus'}),
                                ]
                            })
                        ]
                    }),
                ],
            }))
        })
        return tableRows
    }

    const doc = new Document({
        sections: [{
            children: [
                new Table({
                    columnWidths: [3500, 3500,2000,2000],
                    margins: {bottom: convertMillimetersToTwip(50)},
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
                                    children: [new Paragraph('')]
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
                                                new TextRun({text: `Invoice Number: #${data.invoiceDetails?.invoiceNumber ? data.invoiceDetails?.invoiceNumber : ""}`, size: 24, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessName ? data.profileDetails?.businessName : ""}`, break: 1, bold: true, font: 'Damascus'}),
                                                new TextRun({text: `ABN: ${data.profileDetails?.ABN ? displayABN(data.profileDetails?.ABN) : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessLocation?.streetLine1 ? data.profileDetails?.businessLocation?.streetLine1 : ""}, ${data.profileDetails?.businessLocation?.streetLine2 ? `${data.profileDetails?.businessLocation?.streetLine2},` : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessLocation?.suburb ? data.profileDetails?.businessLocation?.suburb : ""} ${data.profileDetails?.businessLocation?.state ? data.profileDetails?.businessLocation?.state : ""} ${data.profileDetails?.businessLocation?.postcode ? data.profileDetails?.businessLocation?.postcode : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.profileDetails?.businessLocation?.country ? data.profileDetails?.businessLocation?.country : ""}`, break: 1, font: 'Damascus'}),
                                            ],
                                            spacing: {
                                                after: 500
                                            }
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
                                                new TextRun({text: `Bill To:`, break: 1, font: 'Damascus', bold: true}),
                                                new TextRun({text: `${data.billerDetails?.businessName ? data.billerDetails?.businessName : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `ABN: ${data.billerDetails?.ABN ? data.billerDetails?.ABN  : ""}`, break: 1, font: 'Damascus'}),
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
                                                new TextRun({text: `Ship To:`, font: 'Damascus', break: 1, bold: true}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.streetLine1 ? data.billerDetails?.businessLocation?.streetLine1 : ""} ${data.billerDetails?.businessLocation?.streetLine2 != undefined ? data.billerDetails?.businessLocation?.streetLine2 : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.suburb ? data.billerDetails?.businessLocation?.suburb : ""} ${data.billerDetails?.businessLocation?.state != undefined ? data.billerDetails?.businessLocation?.state: ""} ${data.billerDetails?.businessLocation?.postcode!= undefined ? data.billerDetails?.businessLocation?.postcode : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `${data.billerDetails?.businessLocation?.country ? data.billerDetails?.businessLocation?.country : ""}`, break: 1, font: 'Damascus'}),
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
                    rows: lineItemRows()
                }),
                new Table({
                    columnWidths: [3500, 3500,2000,2000],
                    margins: {bottom: convertMillimetersToTwip(50)},
                    borders: {
                        top: {
                            style: 'thick',
                            size: 12,
                            color: "#000000",
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
                            size: 0,
                            color: "#ffffff"
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
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({text: `Notes:`, break: 1, font: 'Damascus', bold: true}),
                                                new TextRun({text: `${data.paymentAndNotes?.notes ? data.paymentAndNotes?.notes : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Payment Terms:`, break: 2, font: 'Damascus'}),
                                                new TextRun({text: `${data.paymentAndNotes?.paymentNotes ? data.paymentAndNotes?.paymentNotes : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Bank Account: ${data.paymentAndNotes?.paymentDetails?.bankAccount ? data.paymentAndNotes?.paymentDetails?.bankAccount : ""}`, break: 2, font: 'Damascus'}),
                                                new TextRun({text: `BSB: ${data.paymentAndNotes?.paymentDetails?.BSB ? data.paymentAndNotes?.paymentDetails?.BSB : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Account Number: ${data.paymentAndNotes?.paymentDetails?.ACC ? data.paymentAndNotes?.paymentDetails?.ACC : ""}`, break: 1, font: 'Damascus'})
                                            ],
                                        })
                                    ]
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
                                            alignment: 'right',
                                            children: [
                                                new TextRun({text: `Subtotal: ${data.totals?.subtotal ? displayCurrency(data.totals?.subtotal, 'AUD'): ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Tax: ${data.totals?.taxrate ? displayPercentage(data.totals?.taxrate) : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Total: ${data.totals?.total ? displayCurrency(data.totals?.total,'AUD') : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Amount Paid: ${data.totals?.amountPaid ? displayCurrency(data.totals?.amountPaid, 'AUD') : ""}`, break: 1, font: 'Damascus'}),
                                                new TextRun({text: `Balance Due: ${data.totals ? displayCurrency(data.totals?.total - data.totals?.amountPaid!, 'AUD') : ""}`, break: 1, font: 'Damascus'}),
                                            ],
                                        })
                                ]
                                }),
                            ],
                        }),
                    ],
                }),
            ]
        }]
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'TestInvoice.docx')
    // Packer.toBuffer(doc).then((buffer)=>{
    //     fs.writeFileSync("testtext.docx", buffer)
    // })
}
