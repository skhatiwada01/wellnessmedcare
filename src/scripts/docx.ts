/**
 * Client-side Word (.docx) generation.
 *
 * Everything here runs in the reader's browser. No values typed into a template or
 * a tracker are transmitted anywhere - which is both a privacy promise we make on
 * the site and the reason these files are safe to offer for health data.
 */
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} from 'docx';

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Give the download a tick to start before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const FOOTER_NOTE =
  'Created with wellnessmedcare.com. This document is for your own records. It is not medical advice.';

/** A plain letter: preserves the line breaks of the source text. */
export async function downloadLetter(text: string, filename: string) {
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 22 } },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          ...text.split('\n').map(
            (line) =>
              new Paragraph({
                children: [new TextRun(line)],
                spacing: { after: line.trim() === '' ? 0 : 120 },
              }),
          ),
          new Paragraph({
            spacing: { before: 480 },
            children: [
              new TextRun({ text: FOOTER_NOTE, size: 16, color: '767171', italics: true }),
            ],
          }),
        ],
      },
    ],
  });
  saveBlob(await Packer.toBlob(doc), filename);
}

export interface TrackerSpec {
  title: string;
  /** Short line under the title explaining what to record. */
  intro: string;
  columns: string[];
  /** How many blank rows to draw. */
  rows: number;
  /** Optional lines printed under the table, e.g. what to bring to an appointment. */
  notes?: string[];
}

const cell = (text: string, bold = false) =>
  new TableCell({
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold, size: bold ? 20 : 20 })],
      }),
    ],
  });

/** The document body for one tracker: title, intro, name line, table, notes. */
function trackerChildren(spec: TrackerSpec) {
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: spec.columns.map((c) => cell(c, true)),
      }),
      ...Array.from(
        { length: spec.rows },
        () => new TableRow({ children: spec.columns.map(() => cell(' ')) }),
      ),
    ],
  });

  return [
    new Paragraph({ text: spec.title, heading: HeadingLevel.HEADING_1 }),
    new Paragraph({
      spacing: { after: 240 },
      children: [new TextRun({ text: spec.intro, size: 20, color: '595959' })],
    }),
    new Paragraph({
      spacing: { after: 240 },
      children: [
        new TextRun({ text: 'Name: ', bold: true, size: 20 }),
        new TextRun({ text: '_'.repeat(34), size: 20 }),
        new TextRun({ text: '     Date range: ', bold: true, size: 20 }),
        new TextRun({ text: '_'.repeat(26), size: 20 }),
      ],
    }),
    table,
    ...(spec.notes ?? []).map(
      (n) =>
        new Paragraph({
          spacing: { before: 200 },
          children: [new TextRun({ text: n, size: 20 })],
        }),
    ),
    new Paragraph({
      spacing: { before: 400 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: FOOTER_NOTE, size: 16, color: '767171', italics: true }),
      ],
    }),
  ];
}

/** A printable blank tracking sheet: header row plus empty rows to fill in by hand. */
export async function downloadTracker(spec: TrackerSpec, filename: string) {
  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ properties: {}, children: trackerChildren(spec) }],
  });
  saveBlob(await Packer.toBlob(doc), filename);
}

/**
 * Several trackers in ONE Word file - each tracker starts its own page, because each
 * spec becomes its own document section.
 */
export async function downloadTrackerBundle(specs: TrackerSpec[], filename: string) {
  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: specs.map((spec) => ({ properties: {}, children: trackerChildren(spec) })),
  });
  saveBlob(await Packer.toBlob(doc), filename);
}

/** CSV alternative for anyone who would rather use a spreadsheet. */
export function downloadCsv(columns: string[], rows: number, filename: string) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [columns.map(esc).join(','), ...Array.from({ length: rows }, () => columns.map(() => '').join(','))];
  saveBlob(new Blob([lines.join('\r\n')], { type: 'text/csv;charset=utf-8' }), filename);
}
