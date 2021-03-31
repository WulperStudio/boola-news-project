import { GitMediaStore } from "@tinacms/git-client";

export class MyGitMediaStore extends GitMediaStore {
  strapiUrl = "https://boola-news-admin.herokuapp.com";

  async previewSrc(id) {
    const response = await fetch(`${this.strapiUrl}/upload/files/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return this.strapiUrl + data.url;
  }

  async list(options) {
    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? 50;

    const response = await fetch(`${this.strapiUrl}/upload/files`, {
      method: "GET",
    });

    if (response.status !== 200) {
      throw Error(response.statusText)
    }

    const mediaData = await response.json();
    const nextOffset = offset + limit;

    return {
      items: mediaData.slice(offset, limit + offset).map(this.strapiToTina),
      limit,
      offset,
      totalCount: mediaData.length,
      nextOffset: nextOffset < mediaData.length ? nextOffset : undefined,
    };
  }

  async delete(media) {
    await fetch(`${this.strapiUrl}/upload/files/${media.id}`, {
      method: "DELETE",
    });
  }

  async uploadFile(file) {
    console.log("uploadFile>>>");
    const formData = new FormData();
    formData.append("files", file);
    const uploadResponse = await fetch(`${this.strapiUrl}/upload`, {
      method: "post",
      body: formData,
    });

    if (uploadResponse.status !== 200) {
      throw Error(uploadResponse.statusText)
    }
    return uploadResponse.json();
  }

  async persist(files) {
    const uploaded = [];
    for (const { file } of files) {
      const [item] = await this.uploadFile(file);
      uploaded.push(this.strapiToTina(item));
    }
    return uploaded;
  }

  strapiToTina = (item) => {
    return {
      id: "" + item.id, // Media["id"] should probably be `string | number`
      type: "file",
      directory: "/uploads",
      filename: item.hash + item.ext + `?${item.id}`,
      previewSrc: this.strapiUrl + item.url,
    };
  };
}
