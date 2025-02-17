import Barcode from 'react-barcode';

export const BarcodeGenerator = ({ value }) => {
    return (
        <div className={`${!value && "hidden"} p-2 w-fit`}>
            <Barcode fontSize={15} value={value} />
        </div>
    );
};