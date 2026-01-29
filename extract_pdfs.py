import PyPDF2
import os

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
    except Exception as e:
        return f"Error reading {pdf_path}: {e}"

pdf_files = [f for f in os.listdir('.') if f.endswith('.pdf')]

for pdf in pdf_files:
    print(f"Extracting text from {pdf}...")
    text = extract_text_from_pdf(pdf)
    txt_filename = pdf.replace('.pdf', '.txt')
    with open(txt_filename, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Saved to {txt_filename}")
