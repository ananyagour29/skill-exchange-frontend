export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateRegister = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  if (!isNotEmpty(data.name)) {
    return "Name is required";
  }

  if (!isValidEmail(data.email)) {
    return "Enter a valid email";
  }

  if (!isValidPassword(data.password)) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateLogin = (data: {
  email: string;
  password: string;
}) => {
  if (!isValidEmail(data.email)) {
    return "Enter a valid email";
  }

  if (!isNotEmpty(data.password)) {
    return "Password is required";
  }

  return "";
};

export const validateProfile = (data: {
  currentStatus: string;
  goal: string;
  field: string;
  bio: string;
}) => {
  if (!isNotEmpty(data.currentStatus)) {
    return "Current status is required";
  }

  if (!isNotEmpty(data.goal)) {
    return "Goal is required";
  }

  if (!isNotEmpty(data.field)) {
    return "Field is required";
  }

  if (!isNotEmpty(data.bio)) {
    return "Bio is required";
  }

  return "";
};

export const validateSkill = (data: {
  skillName: string;
  description: string;
}) => {
  if (!isNotEmpty(data.skillName)) {
    return "Skill name is required";
  }

  if (!isNotEmpty(data.description)) {
    return "Description is required";
  }

  return "";
};

export const validateRating = (data: {
  rating: number;
  comment: string;
}) => {
  if (data.rating < 1 || data.rating > 5) {
    return "Rating must be between 1 and 5";
  }

  if (!isNotEmpty(data.comment)) {
    return "Comment is required";
  }

  return "";
};