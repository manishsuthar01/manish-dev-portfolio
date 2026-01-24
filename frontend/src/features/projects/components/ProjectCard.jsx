const ProjectCard = ({ imageUrl }) => {
  return (
    <div className="h-full w-full overflow-hidden  hover:rounded-3xl">
      <img
        src={imageUrl}
        alt="Project view"
        className="w-full h-full object-cover  transition-all duration-500"
      />
    </div>
  );
};

export default ProjectCard;
