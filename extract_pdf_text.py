import json
import PyPDF2
import os
import argparse

def extract_text_from_pdf(pdf_path):
    """Extracts text from each page of a PDF file."""
    text_content = {}
    try:
        with open(pdf_path, 'rb') as pdf_file_obj:
            pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
            num_pages = len(pdf_reader.pages)
            print(f"Reading {num_pages} pages from '{pdf_path}'...")
            for page_num in range(num_pages):
                page_obj = pdf_reader.pages[page_num]
                text = page_obj.extract_text()
                if text: # Add page only if text was extracted
                    text_content[f"page_{page_num + 1}"] = text
                else:
                    text_content[f"page_{page_num + 1}"] = "" # Or some placeholder for blank/unextractable pages
                    print(f"Warning: No text extracted from page {page_num + 1}.")
            print("Finished extracting text.")
    except FileNotFoundError:
        print(f"Error: The file '{pdf_path}' was not found.")
        return None
    except PyPDF2.errors.PdfReadError as e:
        print(f"Error reading PDF (possibly encrypted or corrupted): {e}")
        print(f"Please ensure the PDF at '{pdf_path}' is not encrypted or is a valid PDF file.")
        return None
    except Exception as e:
        print(f"An error occurred while reading the PDF: {e}")
        return None
    return text_content

def save_to_json(data, json_path):
    """Saves the extracted data to a JSON file and prints its size."""
    try:
        output_dir = os.path.dirname(json_path)
        if not output_dir: # Handle case where json_path is just a filename in current dir
            output_dir = "."
        os.makedirs(output_dir, exist_ok=True)
        with open(json_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        print(f"Successfully saved extracted text to '{json_path}'")
        try:
            file_size = os.path.getsize(json_path)
            print(f"Size of the output file '{json_path}': {file_size} bytes")
        except OSError as e:
            print(f"Could not get size of file '{json_path}': {e}")
    except Exception as e:
        print(f"An error occurred while saving the JSON file: {e}")

def main():
    parser = argparse.ArgumentParser(description="Extract text from a PDF and save it as a JSON file.")
    parser.add_argument("pdf_path", help="The full path to the input PDF file.")
    parser.add_argument("json_path", help="The full path to the output JSON file.")
    
    args = parser.parse_args()

    input_pdf_path = args.pdf_path
    output_json_path = args.json_path

    # Log the paths for debugging
    print(f"Input PDF path: {input_pdf_path}")
    print(f"Output JSON path: {output_json_path}")

    extracted_data = extract_text_from_pdf(input_pdf_path)
    
    if extracted_data:
        save_to_json(extracted_data, output_json_path)
    else:
        print("No data was extracted or an error occurred, so no JSON file was saved.")

if __name__ == '__main__':
    main() 