function ShoppingCartEmptyState() {
  return (
    <div className="bg-white rounded">
      <div className="max-w-1432 mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-1xl sm:text-3xl font-semibold text-indigo-600 tracking-wide uppercase">
            Shopping Cart
          </h2>
          <p className="my-8 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Your cart is currently empty!
          </p>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Before proceed to checkout you must add some products to your
            shopping cart.
            <br />
            You will find a lot of differenet products on our "Shop" page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartEmptyState;
