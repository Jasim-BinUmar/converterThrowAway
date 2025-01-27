import Converter from '../src/converter.js';

const converter = Converter.create({
    file:   'test/OPW 733 Tienduizend samplepptx.pptx',
    output: 'output/'
});

const result = converter.convertPptToPdf();