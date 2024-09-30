import girls from '../../../../assets/girls.png';


export default function DeleteConfirmation({DeletItem}) {
  return (
    <>
      <div className='text-center'>
          <img src={ girls} alt='photo '/>
          <h4>
          Delet this {DeletItem} ?
          </h4>
            <span className='text-muted'>Are you sure you want to delete this item?
            if you are sure click on delete</span>
           
         
          </div>
    </>
  )
}
