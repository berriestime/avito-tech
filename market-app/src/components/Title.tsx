import classes from './Title.module.css';

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h1
      className={`${classes.animateGradient} text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 animate-gradient-x`}
    >
      {children}
    </h1>
  );
};

export { Title };
