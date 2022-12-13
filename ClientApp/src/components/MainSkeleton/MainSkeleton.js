import css from './MainSkeleton.module.css';

function MainSkeleton({ children }) {
  return <div className={css.main}>{children}</div>;
}

export default MainSkeleton;
