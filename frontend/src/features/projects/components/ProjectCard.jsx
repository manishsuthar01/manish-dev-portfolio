const ProjectCard = ({ image }) => {
  return (
    
      <div className="h-full w-full overflow-hidden  hover:rounded-3xl">
        <img
          src={
            "https://framerusercontent.com/images/I2DGsvE6BPFKwR3seUVB72UVU.png"
          }
          alt="Project view"
          className="w-full h-full object-cover  transition-all duration-500"
        />
      </div>
  );
};

export default ProjectCard;
