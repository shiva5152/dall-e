import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { Card, FormField, Loader, Navbar } from "../components";
import { instance, useAppContext } from "../context/appContext";
import { getRandomPrompt } from "../utils";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} show={false} />);
  }

  return (
    <div>
      <h2 className="mt-5 font-bold text-[#6469ff] text-xm  mb-3">{title}</h2>
    </div>
  );
};

const CreatePost = () => {
  const { isAuthenticated, user, getUserPost, userPosts } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prompt: "",
    photo: "",
    resolution: "512x512",
  });
  const [flag, setFlag] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const { data } = await instance.post("/dalle", {
          prompt: form.prompt,
          resolution: form.resolution,
        });

        setForm({ ...form, photo: data.photo });
        if (flag)
          await instance.post("/post", {
            ...form,
            name: user.name,
            userId: user._id,
          });
        setFlag(true);
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        await instance.post("/post", {
          ...form,
          name: user.name,
          userId: user._id,
        });

        alert("Success");
        navigate("/");
      } catch (error) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please enter a prompt and generate an image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  useEffect(() => {
    getUserPost();
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px) flex ]">
        <section className="w-9/12 mx-auto md:ml-10">
          <div>
            <h1 className="font-extrabold text=[#222328] text=[32px]">
              Create
            </h1>
            <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
              Create imaginative and visually stunning images through DALL-E AI
              and share them with the community
            </p>
          </div>

          <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Start with a detailed description"
                type="text"
                name="prompt"
                placeholder="an armchair in the shape of an avocado"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe={true}
                handleSurpriseMe={handleSurpriseMe}
              />
              <div>
                <div>
                  <label
                    htmlFor="resolution"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Choose Image Resolution
                  </label>
                  <select
                    id="resolution"
                    name="resolution"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-300 outline-none block w-full p-3"
                  >
                    <option value="1024x1024" className="p-2 mt-4">
                      1024x1024
                    </option>
                    <option selected value="512x512" className="p-2">
                      512x512
                    </option>
                    <option value="256x256" className="p-2">
                      256x256
                    </option>
                  </select>
                </div>
              </div>

              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                )}

                {generatingImg && (
                  <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex gap-5">
              <button
                type="button"
                onClick={generateImage}
                className=" text-white bg-[#020205] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {generatingImg ? "Generating" : "Generate"}
              </button>
            </div>

            <div className="mt-10">
              <p className="mt-2 text-[#666e75] text-[14px]">
                ** Once you have created the image you want, you can share it
                with others in the community **
              </p>
              <button
                type="submit"
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? "Sharing..." : "Share with the Community"}
              </button>
            </div>
          </form>
        </section>
        {/* history */}
        <section className="w-0 md:w-2/12 hidden md:flex flex-col space-y-1 mx-auto overflow-y-auto  overflow-hidden h-screen scroll-m-1 px-5">
          <h1 className="font-bold text=[#222328] text=[32px] mx-auto">
            History
          </h1>
          {isAuthenticated ? (
            <RenderCards data={userPosts} title="No recent history" />
          ) : (
            <RenderCards data={[]} title="Please login for your history" />
          )}
        </section>
      </main>
    </>
  );
};

export default CreatePost;
