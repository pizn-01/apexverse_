import { useState } from "react";
import { useTestimonials, useCreateTestimonial, useDeleteTestimonial, extractXContent, extractInstagramContent } from "@/hooks/useTestimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Instagram, Twitter, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TestimonialsAdmin() {
    const [platform, setPlatform] = useState<"instagram" | "x">("x");
    const [postUrl, setPostUrl] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorHandle, setAuthorHandle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isExtracting, setIsExtracting] = useState(false);

    const { data: testimonials, isLoading } = useTestimonials();
    const createMutation = useCreateTestimonial();
    const deleteMutation = useDeleteTestimonial();
    const { toast } = useToast();

    const handleExtractX = async () => {
        if (!postUrl) {
            toast({
                title: "URL Required",
                description: "Please enter an X post URL",
                variant: "destructive",
            });
            return;
        }

        setIsExtracting(true);
        try {
            const extracted = await extractXContent(postUrl);
            setAuthorName(extracted.authorName);
            setAuthorHandle(extracted.authorHandle || "");
            setContent(extracted.content || "");

            toast({
                title: "Content Extracted",
                description: "X post content has been extracted successfully",
            });
        } catch (error) {
            toast({
                title: "Extraction Failed",
                description: error instanceof Error ? error.message : "Failed to extract content",
                variant: "destructive",
            });
        } finally {
            setIsExtracting(false);
        }
    };

    const handleExtractInstagram = async () => {
        if (!postUrl) {
            toast({
                title: "URL Required",
                description: "Please enter an Instagram post URL",
                variant: "destructive",
            });
            return;
        }

        setIsExtracting(true);
        try {
            const extracted = await extractInstagramContent(postUrl);
            setAuthorName(extracted.authorName);
            setAuthorHandle(extracted.authorHandle || "");
            setContent(extracted.content || "");
            setImageUrl(extracted.imageUrl || "");

            toast({
                title: "Content Extracted",
                description: "Instagram post content has been extracted successfully",
            });
        } catch (error) {
            toast({
                title: "Extraction Failed",
                description: error instanceof Error ? error.message : "Failed to extract content. The post may be private or the URL may be invalid.",
                variant: "destructive",
            });
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postUrl || !authorName || !content) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        try {
            await createMutation.mutateAsync({
                platform,
                postUrl,
                authorName,
                authorHandle: authorHandle || undefined,
                content,
                imageUrl: imageUrl || undefined,
            });

            // Reset form
            setPostUrl("");
            setAuthorName("");
            setAuthorHandle("");
            setContent("");
            setImageUrl("");

            toast({
                title: "Testimonial Added",
                description: "The testimonial has been added successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to add testimonial",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
            toast({
                title: "Testimonial Deleted",
                description: "The testimonial has been removed",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete testimonial",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-8">
                <h1 className="font-['Cinzel'] text-4xl font-bold mb-2">Manage Testimonials</h1>
                <p className="font-['Poppins'] text-gray-600">Add and manage customer testimonials from social media</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Add Testimonial Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-['Cinzel']">Add New Testimonial</CardTitle>
                        <CardDescription>Paste a social media post URL or enter details manually</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Platform Selection */}
                            <div className="space-y-2">
                                <Label>Platform</Label>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant={platform === "x" ? "default" : "outline"}
                                        onClick={() => setPlatform("x")}
                                        className="flex-1"
                                    >
                                        <Twitter className="w-4 h-4 mr-2" />
                                        X (Twitter)
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={platform === "instagram" ? "default" : "outline"}
                                        onClick={() => setPlatform("instagram")}
                                        className="flex-1"
                                    >
                                        <Instagram className="w-4 h-4 mr-2" />
                                        Instagram
                                    </Button>
                                </div>
                            </div>

                            {/* Post URL */}
                            <div className="space-y-2">
                                <Label htmlFor="postUrl">Post URL *</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="postUrl"
                                        type="url"
                                        placeholder="https://twitter.com/user/status/123..."
                                        value={postUrl}
                                        onChange={(e) => setPostUrl(e.target.value)}
                                        required
                                    />
                                    {platform === "x" && (
                                        <Button
                                            type="button"
                                            onClick={handleExtractX}
                                            disabled={isExtracting || !postUrl}
                                            variant="secondary"
                                        >
                                            {isExtracting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Extract"
                                            )}
                                        </Button>
                                    )}
                                    {platform === "instagram" && (
                                        <Button
                                            type="button"
                                            onClick={handleExtractInstagram}
                                            disabled={isExtracting || !postUrl}
                                            variant="secondary"
                                        >
                                            {isExtracting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Extract"
                                            )}
                                        </Button>
                                    )}
                                </div>
                                {platform === "instagram" && (
                                    <div className="text-sm space-y-1">
                                        <p className="text-muted-foreground dark:text-gray-400">
                                            <strong>Note:</strong> Instagram's API requires authentication (Meta App credentials).
                                        </p>
                                        <p className="text-muted-foreground dark:text-gray-400">
                                            You can try clicking Extract, but if it fails, please enter the details manually below.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Author Name */}
                            <div className="space-y-2">
                                <Label htmlFor="authorName">Author Name *</Label>
                                <Input
                                    id="authorName"
                                    placeholder="John Doe"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Author Handle */}
                            <div className="space-y-2">
                                <Label htmlFor="authorHandle">Author Handle (optional)</Label>
                                <Input
                                    id="authorHandle"
                                    placeholder="@johndoe"
                                    value={authorHandle}
                                    onChange={(e) => setAuthorHandle(e.target.value)}
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <Label htmlFor="content">Testimonial Content *</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Enter the testimonial text..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                                <Input
                                    id="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={createMutation.isPending}
                            >
                                {createMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    "Add Testimonial"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Testimonials List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-['Cinzel']">Existing Testimonials</CardTitle>
                        <CardDescription>
                            {testimonials?.length || 0} testimonial{testimonials?.length !== 1 ? "s" : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </div>
                        ) : testimonials && testimonials.length > 0 ? (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="border rounded-lg p-4 space-y-2 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                {testimonial.platform === "instagram" ? (
                                                    <Instagram className="w-4 h-4 text-pink-600" />
                                                ) : (
                                                    <Twitter className="w-4 h-4 text-blue-500" />
                                                )}
                                                <div>
                                                    <p className="font-['Poppins'] font-semibold text-sm">
                                                        {testimonial.authorName}
                                                    </p>
                                                    {testimonial.authorHandle && (
                                                        <p className="text-xs text-gray-500">{testimonial.authorHandle}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <a
                                                    href={testimonial.postUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(testimonial.id)}
                                                    className="text-red-400 hover:text-red-600"
                                                    disabled={deleteMutation.isPending}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="font-['Poppins'] text-sm text-gray-700 line-clamp-3">
                                            {testimonial.content}
                                        </p>
                                        {testimonial.imageUrl && (
                                            <img
                                                src={testimonial.imageUrl}
                                                alt={testimonial.authorName}
                                                className="w-16 h-16 rounded object-cover"
                                            />
                                        )}
                                        <p className="text-xs text-gray-400">
                                            Added {new Date(testimonial.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>No testimonials yet</p>
                                <p className="text-sm">Add your first testimonial to get started</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
