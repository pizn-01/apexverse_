import { useState } from "react";
import { usePortfolioItems, useCreatePortfolioItem, useDeletePortfolioItem } from "@/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Image as ImageIcon, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadPortfolioImages, validateFileSize, validateFileType, getFileSizeString } from "@/lib/uploadUtils";

export default function PortfolioAdmin() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [lineArtFile, setLineArtFile] = useState<File | null>(null);
    const [fullArtFile, setFullArtFile] = useState<File | null>(null);
    const [lineArtPreview, setLineArtPreview] = useState<string | null>(null);
    const [fullArtPreview, setFullArtPreview] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const { data: portfolioItems, isLoading } = usePortfolioItems();
    const createMutation = useCreatePortfolioItem();
    const deleteMutation = useDeletePortfolioItem();
    const { toast } = useToast();

    const handleLineArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!validateFileType(file)) {
            toast({
                title: "Invalid File Type",
                description: "Please upload an image file (JPG, PNG, GIF, or WebP)",
                variant: "destructive",
            });
            return;
        }

        if (!validateFileSize(file)) {
            toast({
                title: "File Too Large",
                description: `File size is ${getFileSizeString(file.size)}. Maximum size is 5MB`,
                variant: "destructive",
            });
            return;
        }

        setLineArtFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setLineArtPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleFullArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!validateFileType(file)) {
            toast({
                title: "Invalid File Type",
                description: "Please upload an image file (JPG, PNG, GIF, or WEBP)",
                variant: "destructive",
            });
            return;
        }

        if (!validateFileSize(file)) {
            toast({
                title: "File Too Large",
                description: `File size is ${getFileSizeString(file.size)}. Maximum size is 5MB`,
                variant: "destructive",
            });
            return;
        }

        setFullArtFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setFullArtPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category || !lineArtFile || !fullArtFile) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all required fields and select both images",
                variant: "destructive",
            });
            return;
        }

        setIsUploading(true);

        try {
            const { lineArtUrl, fullArtUrl } = await uploadPortfolioImages(lineArtFile, fullArtFile);

            await createMutation.mutateAsync({
                title,
                category,
                lineArtUrl,
                fullArtUrl,
                description: description || undefined,
            });

            setTitle("");
            setCategory("");
            setLineArtFile(null);
            setFullArtFile(null);
            setLineArtPreview(null);
            setFullArtPreview(null);
            setDescription("");

            toast({
                title: "Portfolio Item Added",
                description: "The portfolio item has been added successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to add portfolio item",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this portfolio item?")) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
            toast({
                title: "Portfolio Item Deleted",
                description: "The portfolio item has been removed",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete portfolio item",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-8">
                <h1 className="font-['Cinzel'] text-4xl font-bold mb-2">Manage Portfolio</h1>
                <p className="font-['Poppins'] text-gray-600">Upload portfolio items with line art and completed artwork</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-['Cinzel']">Add New Portfolio Item</CardTitle>
                        <CardDescription>Upload images from your device</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Character Scene 1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    placeholder="Character Art, Book Illustration, etc."
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lineArt">Line Art Image *</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="lineArt"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLineArtChange}
                                        required
                                        className="cursor-pointer"
                                    />
                                    {lineArtFile && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setLineArtFile(null);
                                                setLineArtPreview(null);
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                                {lineArtPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={lineArtPreview}
                                            alt="Line art preview"
                                            className="w-full h-48 object-cover rounded border"
                                        />
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Upload the line art/sketch version (Max 5MB)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullArt">Completed Art Image *</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="fullArt"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFullArtChange}
                                        required
                                        className="cursor-pointer"
                                    />
                                    {fullArtFile && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setFullArtFile(null);
                                                setFullArtPreview(null);
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                                {fullArtPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={fullArtPreview}
                                            alt="Full art preview"
                                            className="w-full h-48 object-cover rounded border"
                                        />
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Upload the completed/colored version (Max 5MB)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description (optional)</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Additional details about this artwork..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isUploading || createMutation.isPending}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : createMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Add Portfolio Item
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-['Cinzel']">Existing Portfolio Items</CardTitle>
                        <CardDescription>
                            {portfolioItems?.length || 0} item{portfolioItems?.length !== 1 ? "s" : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </div>
                        ) : portfolioItems && portfolioItems.length > 0 ? (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {portfolioItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-['Poppins'] font-semibold text-sm">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-gray-500">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-400 hover:text-red-600"
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {item.description && (
                                            <p className="font-['Poppins'] text-sm text-gray-700 line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <ImageIcon className="w-3 h-3" />
                                                    Line Art
                                                </p>
                                                <img
                                                    src={item.lineArtUrl}
                                                    alt={`${item.title} - Line Art`}
                                                    className="w-full h-24 rounded object-cover"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <ImageIcon className="w-3 h-3" />
                                                    Completed
                                                </p>
                                                <img
                                                    src={item.fullArtUrl}
                                                    alt={`${item.title} - Completed`}
                                                    className="w-full h-24 rounded object-cover"
                                                />
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Added {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>No portfolio items yet</p>
                                <p className="text-sm">Add your first portfolio item to get started</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
