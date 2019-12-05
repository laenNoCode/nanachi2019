<?php
@ini_set("upload_max_filesize", "4GB");
@ini_set("post_max_size", "4GB");?><!DOCTYPE html>
<html>
<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload file" name="submit">
</form>

</body>
</html>
<?php
$target_dir = "../partage/";
$target_file =$target_dir.$_FILES["fileToUpload"]["name"];
move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)
?>