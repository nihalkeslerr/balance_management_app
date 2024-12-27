import React from "react";

function LoanApplicationForm({ onChangeLoanInput, handleLoanSubmit }) { // Kredi başvurusu yapılarak bakiye arttırma formu
  const handleNumberInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <div className=" flex justify-content-center ">
      <div className="md:w-1/2 w-full p-2">
        <form onSubmit={handleLoanSubmit}>
          <div className="flex flex-wrap">
            <div className="mb-2 w-full xl:w-1/2">
              <label htmlFor="" className="text-gray-600 mb-1">İsim: <span className="text-red-600 ml-2">*</span></label>
              <input
                type="text"
                placeholder=""
                className="border p-2 mb-2 w-full rounded-md"
                name="name"
                onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
                required
              />
            </div>
            <div className="mb-2 w-full xl:w-1/2">
              <label htmlFor="" className="text-gray-600 mb-1">Soy İsim:<span className="text-red-600 ml-2">*</span></label>
              <input
                type="text"
                placeholder=""
                className="border p-2 mb-2 w-full rounded-md"
                name="lastName"
                onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
                required
              />
            </div>
          </div>
          <label htmlFor="" className="text-gray-600 mb-1">TC Kimlik No:<span className="text-red-600 ml-2">*</span></label>
          <input
            type="text"
            placeholder="xxxxxxxxxxx"
            className="border p-2 mb-2 w-full rounded-md"
            name="idNumber"
            maxLength="11"
            onInput={handleNumberInput}
            onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
            required
          />
          <label htmlFor="" className="text-gray-600 mb-1">Tutar:<span className="text-red-600 ml-2">*</span></label>
          <input
            type="text"
            placeholder=""
            className="border p-2 mb-2 w-full rounded-md"
            name="amount"
            onInput={handleNumberInput}
            onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 rounded-md w-full"
          >
            Başvur
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoanApplicationForm;
