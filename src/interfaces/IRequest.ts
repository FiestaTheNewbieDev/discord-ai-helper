type RequestType = 'TEXT' | 'PICTURE';

interface IAbstractRequest {
    type: RequestType;
}

interface ITextRequest extends IAbstractRequest {
    type: 'TEXT';
}

interface IPictureRequest extends IAbstractRequest {
    type: 'PICTURE';
    request: {
        prompt: string;
        n: number;
    };
}

type IRequest = ITextRequest | IPictureRequest;

export default IRequest;
