type Props = {
    headingOne?: string;
    headingTwo?: string;
}
export const SingleOrderSectionTitle = ({
    headingOne,
    headingTwo,
}: Props) => {
    return (
        <div className=' font-medium flex items-center gap-6'>
            <div className='h-0.5 rounded-xl bg-gray-100 flex-1'></div>
            {headingOne && <h1 className='text-primary text-lg'>{headingOne}</h1>}
            {headingTwo && <h2 className='text-primary'>{headingTwo}</h2>}
            <div className='h-0.5 rounded-xl bg-gray-100 flex-1'></div>
        </div>)
}
