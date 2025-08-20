import { Blog } from "../../models/dashboard_model/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, language, website } = req.body;

    // Cloudinary URL comes from multer-cloudinary after upload
    const imageUrl = req.file?.path;

    if (!title || !content || !language || !website || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required including image"
      });
    }

    const newBlog = await Blog.create({
      title,
      image: imageUrl,
      content,
      language,
      website
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { website } = req.params; // website name from URL params

    const filter = {};
    if (website) {
      filter.website = website.toLowerCase();
    }

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
