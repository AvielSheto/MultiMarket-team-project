import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { settingProduct, uploadProduct } from '../../features/product/produceSlice';
import InputProduct from './InputProduct';

export default function ProductForm() {

  const item = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    barcode: '',
    image: '',
    name: '',
    price: 0,
    priority: 1,
    productStock:0,
    description: '',
    storeId: '',
    manufacturer: '',
    kosherType: '',
    productTag: '',
    subcategory: '',
    weightUnit: '',
    units: 0,
    contactNumber: '',
    manufacturer: '',
    parallelImporter: false,
    importer: '',
    createdBy:'test-destaw'
  });
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    
    if(name === 'image'){
      const file = e.target.files[0]
      TransformFileData(file)
    }else{
      console.log(name);
      setProduct({ ...product, [name]: value });
    }
  };



  const TransformFileData = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProduct({ ...product, image:reader.result});
      };
    } else {
      setProduct({ ...product, image:''});
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    product.storeId ='6390605ef3ee5834eff8fa0c'
    dispatch(uploadProduct(product));
    // dispatch(settingProduct({ product }));
    // navigate('/addproduct/formproducttwo')
  };

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-2" onSubmit={handleForm}>
          <InputProduct funChange={handleInput} textLabel='שם המוצר' name='name' type='name' placeholder='לדוגמה: עגבניות שרי' />
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D] text-right">
                תמונת המוצר:
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold"> לחץ להעלאת תמונה </span>
                      או גרור קובץ לכאן{' '}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={handleInput}
                    name="image"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>

              {product.image && (
                <div className="mb-5 mt-2 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3  text-base font-medium text-[#07074D]">
                      {product.image}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <InputProduct funChange={handleInput} textLabel='ברקוד מוצר:' name='barcode' type='text' placeholder='הכנס ברקוד' />
            <InputProduct funChange={handleInput} textLabel='מחיר מוצר' name='price' type='text' placeholder='הכנס מחיר' min={1}/>
            <InputProduct funChange={handleInput} textLabel='עדיפות מוצר:' name='priority' type='number' placeholder='הכנס עדיפות מוצר'  min={1} max={5}/>
            <InputProduct funChange={handleInput} textLabel='כמות המוצר' name='productStock' type='number' placeholder='הכנס כמות מוצר' min={1}/>
            <div>
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D] text-right"
              >
                {' '}
                תיאור מוצר:
              </label>
              <textarea
                placeholder="הכנס תיאור מוצר"
                onChange={handleInput}
                name="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={''}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="kosherType"
                className="mb-3 block text-base font-medium text-[#07074D] text-right"
              >
                סוג כשרות:
              </label>
              <select
                onChange={handleInput}
                name="kosherType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>בחר סוג כשרות</option>
                <option value='בד"ץ'>בד"ץ</option>
                <option value="רבנות">רבנות</option>
                <option value="מהדרין">מהדרין</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="productTag"
                className="mb-3 block text-base font-medium text-[#07074D] text-right"
              >
                חיי מדף:
              </label>
              <select
                onChange={handleInput}
                name="productTag"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>בחר סוג תוקף</option>
                <option value="surfaces">מוצר מדף</option>
                <option value="short-exp">תוקף קצר</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="subcategory"
                className="mb-3 block text-base font-medium text-[#07074D] text-right"
              >
                קטגוריית מוצר:
              </label>
              <select
                defaultValue={'בחר קטגוריית מוצר'}
                onChange={handleInput}
                name="subcategory"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>בחר קטגוריית מוצר</option>
                <option value="ירקות">ירקות</option>
                <option value="פירות">פירות</option>
                <option value="חלבי">חלבי</option>
                <option value="בשרים">בשרים</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="weightUnit"
                className="mb-3 block text-base font-medium text-[#07074D] text-right"
              >
                יחידות משקל:
              </label>
              <select
                defaultValue={'בחר סוג יחידת משקל'}
                onChange={handleInput}
                name="weightUnit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>בחר סוג יחידת משקל</option>
                <option value="kg">קילוגרמים</option>
                <option value="g">גרמים</option>
                <option value="liters">ליטרים</option>
              </select>
            </div>
            <InputProduct funChange={handleInput} textLabel='משקל מוצר:' name='weight' type='number' placeholder='לדוגמר: 10' />
            <InputProduct funChange={handleInput} textLabel='יחידות מוצר:' name='units' type='number' placeholder='לדוגמר: 10' />
           
            <div className="mb-5">
              <label
                htmlFor="parallelImporter"
                className="mb-3 block text-base font-medium text-[#07074D] text-right"
              >
                סוג יבואן:
              </label>
              <div className="flex items-center">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="parallelImporter"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 mx-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                >
                  יבואן מקביל
                </label>
              </div>
            </div>

            <InputProduct funChange={handleInput} textLabel=' יבואן המוצר:' name='importer' type='text' placeholder='הכנס שם יבואן' />
            <InputProduct funChange={handleInput} textLabel='יצרן:' name='manufacturer' type='text' placeholder='הכנס שם יצרן'  />
            <InputProduct funChange={handleInput} textLabel='פרטים ליצירת קשר:' name='contactNumber' type='text' placeholder='הכנס פרטים ליצרית קשר'  />
          

            <div>
              <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:shadow-form w-full rounded-md mt-4 bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                העלאה מוצר
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
