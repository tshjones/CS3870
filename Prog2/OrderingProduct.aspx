<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OrderingProduct.aspx.cs" Inherits="Prog2.OrderingProduct" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>"CS3870-Fall 2019 - Program 2"</title>
    <link href="StyleSheet1.css" rel="stylesheet" type="text/css" />
</head>
<body style="height: 61px; width: 1409px">
    <form id="form1" runat="server">
        <div class = "Leftpanel">
            <p>
            <a href="Default.aspx">Start Page</a>
            <p>
            <a href="OrderingProduct.aspx">Order Product</a>
        </div>
        <div class="Rightpanel">
            <h1 class="defaultTitle">Web Protocols, Technologies and Applications </h1>
            <h2 class="nameTitle">Tod Jones</h2>
            <p class="nameTitle">
                <asp:Label ID="Label2" runat="server" Text="Text ID"></asp:Label>
            </p>
            <p class="nameTitle">
                <asp:TextBox ID="TxtID" runat="server"></asp:TextBox>
            </p>
            <p class="nameTitle">
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="TxtID" ErrorMessage="ID cannot be empty" ForeColor="Red"></asp:RequiredFieldValidator>
            </p>
            <p class="nameTitle">
                <asp:Label ID="Label3" runat="server" Text="Text Price"></asp:Label>
            </p>
            <p class="nameTitle">
                <asp:TextBox ID="txtPrice" runat="server"></asp:TextBox>
            </p>
            <p class="nameTitle">&nbsp;</p>
            <p class="nameTitle">
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtPrice" ErrorMessage="RequiredFieldValidator"></asp:RequiredFieldValidator>
            </p>
            <p class="nameTitle">&nbsp;</p>
            <p class="nameTitle">&nbsp;</p>
            <p class="nameTitle">&nbsp;</p>
            <p class="nameTitle">&nbsp;</p>
            <p class="nameTitle">
                <asp:Button ID="btnCompute" runat="server" Text="Compute" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <asp:Button ID="BtnReset" runat="server" Text="Button" />
            </p>
        </div>
    </form>
</body>
</html>
