import json
import os
from deep_translator import GoogleTranslator

# Configuración de rutas
BASE_PATH = "src/i18n"
SOURCE_FILE = os.path.join(BASE_PATH, "es.json")
TARGET_FILE = os.path.join(BASE_PATH, "en.json")

def translate_recursive(obj, translator):
    """
    Recorre el JSON de forma recursiva. 
    Traduce strings y mantiene diccionarios/listas.
    """
    if isinstance(obj, dict):
        return {k: translate_recursive(v, translator) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_recursive(i, translator) for i in obj]
    elif isinstance(obj, str):
        # No traducir si es un link, un mail o texto muy corto (como años)
        if obj.startswith(('http', 'mailto')) or (obj.isdigit()) or len(obj) < 2:
            return obj
        try:
            print(f"Traduciendo: {obj[:30]}...")
            return translator.translate(obj)
        except Exception as e:
            print(f"Error traduciendo '{obj}': {e}")
            return obj
    return obj

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"❌ Error: No se encontró el archivo {SOURCE_FILE}")
        return

    # Inicializar traductor
    translator = GoogleTranslator(source='es', target='en')

    # 1. Leer el archivo original
    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        data_es = json.load(f)

    # 2. Traducir contenido
    print("🚀 Iniciando traducción de Español a Inglés...")
    data_en = translate_recursive(data_es, translator)

    # 3. Guardar el resultado
    with open(TARGET_FILE, 'w', encoding='utf-8') as f:
        json.dump(data_en, f, indent=2, ensure_ascii=False)

    print(f"\n✅ ¡Éxito! Archivo generado en: {TARGET_FILE}")

if __name__ == "__main__":
    main()