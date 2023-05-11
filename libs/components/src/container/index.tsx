import classNames from 'classnames';

const Container = ({ children, className }: any) => {
  return (
    <div
      className={classNames(
        `max-w-2xl mx-auto md:max-w-1432`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
