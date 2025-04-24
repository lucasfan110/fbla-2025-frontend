import { Document, Page } from "react-pdf";
import "./PdfDisplay.scss";
import { useState } from "react";

interface Props {
    file: File;
}

export default function PdfDisplay({ file }: Props) {
    const [numPages, setNumPages] = useState<number | null>(null);

    return (
        <div className="pdf-display">
            <Document file={file} onLoadSuccess={e => setNumPages(e.numPages)}>
                {Array.from(new Array(numPages), (_, idx) => (
                    <Page
                        key={idx + 1}
                        pageNumber={idx + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pdf-display__resume-page"
                    />
                ))}
            </Document>
        </div>
    );
}
